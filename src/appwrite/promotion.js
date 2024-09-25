import { Client, Databases, ID, Query, Functions } from "appwrite";
import { getENV } from "@/getENV";
import BucketService from "@/appwrite/bucket";

class PromotionService {
  constructor() {
    this.client = new Client()
      .setEndpoint(getENV("ENDPOINT"))
      .setProject(getENV("PROJECT_ID"));
    this.databases = new Databases(this.client);
    this.functions = new Functions(this.client);
  }

  async listPromotions() {
    try {
      const [banners, promoCodes, discounts, promoCard] = await Promise.all([
        this.listBanners(),
        this.listPromoCodes(),
        this.listDiscounts(),
        this.listPromoCard(),
      ]);

      if (banners.success) {
        const previews = await BucketService.getFilePreviews(
          getENV("BANNERS_BUCKET_ID"),
          banners.result.map((banner) => banner.$id)
        );
        if (previews.success) {
          banners.result.forEach((banner, index) => {
            banner.preview = previews.previews[index];
          });
        }
      }

      return {
        success: true,
        result: {
          banners: banners.result,
          promoCodes: promoCodes.result,
          discounts: discounts.result,
          promoCard: promoCard.result,
        },
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async addBanners(data) {
    try {
      // Get length of images in bucket
      const banners = await this.listBanners();
      if (!banners.success) {
        throw new Error(banners.message);
      }
  
      const bannerCount = banners.result.length;
      if (bannerCount + data.images.length > 8) {
        throw new Error("Cannot add more than 8 banners");
      }
  
      // Upload images and wait for all uploads to complete
      const uploadResponse = await BucketService.upload(
        getENV("BANNERS_BUCKET_ID"),
        data.images
      );
  
      if (!uploadResponse.success) {
        throw new Error(uploadResponse.message);
      }
  
      // Wait for all promises in the upload response to resolve
      const results = await Promise.all(uploadResponse.promises);
  
      return { success: true, result: results };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async listBanners() {
    try {
      const banners = await BucketService.listFiles(getENV("BANNERS_BUCKET_ID"));
      if (!banners.success) {
        throw new Error(banners.message);
      }

      return { success: true, result: banners.files };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteBanner(id) {
    try {
      const response = await BucketService.delete(
        getENV("BANNERS_BUCKET_ID"),
        id
      );
      if (!response.success) {
        throw new Error(response.message);
      }
     
      return { success: true, result: response.result };
    }
    catch (error) {
      return { success: false, message: error.message };
    }
  }

  async listPromoCodes() {
    try {
      // Implement the logic to list promo codes
      const promoCodes = await this.databases.listDocuments(
        getENV("DB_ID"),
        getENV("PROMO_CODES_COLLECTION_ID")
      );
      return { success: true, result: promoCodes.documents };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async addDiscount(data) {
    console.log(data);
    try {
      // Fetch the list of all discounts
      const {success, result, message} = await this.listDiscounts();
      if (!success) {
        throw new Error(message);
      }
  
      // Check if an "all" type discount already exists
      if (result.some((discount) => discount.type === "all")) {
        throw new Error("An 'all' type discount already exists.");
      }
  
      // Check if a discount for the selected product already exists
      if (data.type === "product" && result.some((discount) => discount.type === "product" && discount.product === data.product)) {
        throw new Error("This product already has a discount.");
      }
  
      // Check if a discount for the selected category already exists
      if (data.type === "category" && result.some((discount) => discount.type === "category" && discount.category === data.category)) {
        throw new Error("This category already has a discount.");
      }
  
      // Implement the logic to add discount
      const discount = await this.databases.createDocument(
        getENV("DB_ID"),
        getENV("DISCOUNTS_COLLECTION_ID"),
        ID.unique(),
        data
      );
      console.log(discount);
      return { success: true, result: discount };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }

  async updateDiscount(id, data) {
    try {
      // Implement the logic to update discount
      const discount = await this.databases.updateDocument(
        getENV("DB_ID"),
        getENV("DISCOUNTS_COLLECTION_ID"),
        id,
        data
      );
      return { success: true, result: discount };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteDiscount(id) {
    try {
      // Implement the logic to delete discount
      const discount = await this.databases.deleteDocument(
        getENV("DB_ID"),
        getENV("DISCOUNTS_COLLECTION_ID"),
        id
      );
      return { success: true, result: discount };
    }
    catch (error) {
      return { success: false, message: error.message };
    }
  }

  async listDiscounts() {
    try {
      // Implement the logic to list discounts
      const discounts = await this.databases.listDocuments(
        getENV("DB_ID"),
        getENV("DISCOUNTS_COLLECTION_ID"),
        [
          Query.orderDesc("$createdAt"),
        ]
      );
      return { success: true, result: discounts.documents };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  //promoCard related functions start here
  async listPromoCard() {
    try {
      // Implement the logic to list promo cards
      const promoCard = await this.databases.listDocuments(
        getENV("DB_ID"),
        getENV("PROMO_CARD_COLLECTION_ID")
      );
      return { success: true, result: promoCard.documents[0] };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updatePromoCard(id, data) {
    try {
      // Implement the logic to update promo card
      const promoCard = await this.databases.updateDocument(
        getENV("DB_ID"),
        getENV("PROMO_CARD_COLLECTION_ID"),
        id,
        data
      );
      return { success: true, result: promoCard };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  //promoCard related functions end here

}

export default new PromotionService();