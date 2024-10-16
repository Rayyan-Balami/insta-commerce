import { Client, Databases, ID, Query } from "appwrite";
import { getENV } from "@/getENV";
import BucketService from "@/appwrite/bucket";

class ProductService {
  constructor() {
    this.client = new Client()
      .setEndpoint(getENV("ENDPOINT"))
      .setProject(getENV("PROJECT_ID"));
    this.databases = new Databases(this.client);
  }

  async createProduct(data) {
    let uploadedFileIDs = [];

    try {
      // Upload images and wait for all uploads to complete
      const uploadResponse = await BucketService.upload(
        getENV("PRODUCTS_BUCKET_ID"),
        data.images
      );

      if (!uploadResponse.success) {
        throw new Error(uploadResponse.message);
      }

      // Extract the file IDs from the successful uploads
      uploadedFileIDs = await Promise.all(uploadResponse.promises);

      // Create the product document in the database with the uploaded image IDs
      const result = await this.databases.createDocument(
        getENV("DB_ID"),
        getENV("PRODUCTS_COLLECTION_ID"),
        ID.unique(),
        {
          ...data, // Spread the rest of the data object
          skus: JSON.stringify(data.skus), // Convert skus array to JSON string
          images: uploadedFileIDs.map((file) => file.$id), // Map file IDs from the uploaded images
          video: data.video && data.video.length > 0 ? data.video : null, // Handle the video property
        }
      );

      return { success: true, result };
    } catch (error) {
      // Rollback: Delete uploaded files if document creation fails
      if (uploadedFileIDs.length > 0) {
        try {
          const deletePromises = uploadedFileIDs.map((file) =>
            BucketService.delete(getENV("PRODUCTS_BUCKET_ID"), file.$id)
          );
          await Promise.all(deletePromises);
        } catch (deleteError) {
          return { success: false, message: deleteError.message };
        }
      }

      return { success: false, message: error.message };
    }
  }

  async updateProduct(id, data, currentImages = []) {
    let newImageIDs = [];

    try {
      // Fetch the existing product data
      const existingProduct = await this.getProduct(id);

      if (!existingProduct.success) {
        throw new Error("Product not found");
      }

      let existingImages = existingProduct.result.images || [];

      // Remove not in use images
      const imagesToDelete = existingImages.filter(
        (fileID) => !currentImages.includes(fileID)
      );

      // Delete images that are no longer in use
      if (imagesToDelete.length > 0) {
        const deletePromises = imagesToDelete.map((fileID) =>
          BucketService.delete(getENV("PRODUCTS_BUCKET_ID"), fileID)
        );
        const deleteResponses = await Promise.all(deletePromises);

        deleteResponses.forEach((response) => {
          if (!response.success) {
            throw new Error(response.message);
          }
        });

        // Remove the deleted images from the existing images array
        existingImages = existingImages.filter(
          (fileID) => !imagesToDelete.includes(fileID)
        );
      }

      // Handle image updates: Upload new images if provided
      if (data.images && data.images.length > 0) {
        const uploadResponse = await BucketService.upload(
          getENV("PRODUCTS_BUCKET_ID"),
          data.images
        );

        if (!uploadResponse.success) {
          throw new Error(uploadResponse.message);
        }

        // Extract the new file IDs from the successful uploads
        newImageIDs = await Promise.all(uploadResponse.promises);

        // Add the new image IDs to the existing images array
        existingImages = [
          ...existingImages,
          ...newImageIDs.map((file) => file.$id),
        ];
      }

      // Update the product document in the database
      const result = await this.databases.updateDocument(
        getENV("DB_ID"),
        getENV("PRODUCTS_COLLECTION_ID"),
        id,
        {
          ...data, // Spread the rest of the data object
          skus: JSON.stringify(data.skus), // Convert skus array to JSON string
          images: existingImages, // Use the updated images array
          video: data.video && data.video.length > 0 ? data.video : null, // Handle the video property
        }
      );

      return { success: true, result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteProduct(id) {
    try {
      // Fetch the product to get associated images before deletion
      const product = await this.getProduct(id);

      if (!product.success) {
        throw new Error("Product not found");
      }

      const imageFileIDs = product.result.images || [];

      // After successful deletion, delete associated files
      if (imageFileIDs.length > 0) {
        const deletePromises = imageFileIDs.map((fileID) =>
          BucketService.delete(getENV("PRODUCTS_BUCKET_ID"), fileID)
        );

        const deleteResponses = await Promise.all(deletePromises);

        deleteResponses.forEach((response) => {
          if (!response.success) {
            throw new Error(response.message);
          }
        });
      }

      // Delete the product document
      const result = await this.databases.deleteDocument(
        getENV("DB_ID"),
        getENV("PRODUCTS_COLLECTION_ID"),
        id
      );

      return { success: true, result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async listProducts({ sort = "desc", status = "active" } = {}) {
    try {
      const queries = [
        sort === "asc"
          ? Query.orderAsc("$createdAt")
          : Query.orderDesc("$createdAt"),
      ];

      // Only add the status query if the status is not "all"
      if (status !== "all") {
        queries.push(Query.equal("status", status));
      }

      const result = await this.databases.listDocuments(
        getENV("DB_ID"),
        getENV("PRODUCTS_COLLECTION_ID"),
        queries
      );

      // Create image preview URLs
      const imagePreviews = result.documents.map(
        (doc) =>
          BucketService.getFilePreviews(
            getENV("PRODUCTS_BUCKET_ID"),
            doc.images
          ).previews
      );

      // Convert the skus string back to an array
      result.documents = result.documents.map((doc, index) => ({
        ...doc,
        skus: JSON.parse(doc.skus),
        imagePreviews: imagePreviews[index],
      }));

      return { success: true, result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getProduct(id) {
    try {
      const result = await this.databases.getDocument(
        getENV("DB_ID"),
        getENV("PRODUCTS_COLLECTION_ID"),
        id
      );

      // Create image preview URLs
      const imagePreviews = BucketService.getFilePreviews(
        getENV("PRODUCTS_BUCKET_ID"),
        result.images
      ).previews;

      // Convert the skus string back to an array
      result.skus = JSON.parse(result.skus);

      return { success: true, result, imagePreviews };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new ProductService();
