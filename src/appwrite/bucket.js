import { Client, Storage, ID, Query } from "appwrite";
import { getENV } from "@/getENV";

class BucketService {
  constructor() {
    this.client = new Client()
      .setEndpoint(getENV("ENDPOINT"))
      .setProject(getENV("PROJECT_ID"));
    this.storage = new Storage(this.client);
  }

  async upload(bucketID, files = []) {
    try {
      const promises = files.map((file) =>
        this.storage.createFile(bucketID, ID.unique(), file)
      );
      return { success: true, promises };
    } catch (error) {
      console.error("Upload error:", error);
      return { success: false, message: error.message };
    }
  }

  async delete(bucketID, fileID) {
    try {
      await this.storage.deleteFile(bucketID, fileID);
      return { success: true };
    } catch (error) {
      console.error("Delete error:", error);
      return { success: false, message: error.message };
    }
  }

  getFilePreviews(bucketID, imageIDs) {
    try {
      const previews = imageIDs.map(
        (imageID) =>
          `https://cloud.appwrite.io/v1/storage/buckets/${bucketID}/files/${imageID}/preview?project=${getENV(
            "PROJECT_ID"
          )}`
      );
      return { success: true, previews };
    } catch (error) {
      console.error("Get file previews error:", error);
      return { success: false, message: error.message };
    }
  }

  async listFiles(bucketID) {
    try {
      const response = await this.storage.listFiles(
        bucketID,
        [
          Query.orderDesc("$createdAt"),
        ]

      );
      return { success: true, files: response.files };
    } catch (error) {
      console.error("List files error:", error);
      return { success: false, message: error.message };
    }
  }

  async getFiles(bucketID, fileID = []) {
    try {
      const promises = fileID.map((id) =>
        this.storage.getFileView(bucketID, id)
      );
    const response = await Promise.all(promises);
    console.log("response", response);
      return { success: true, result: response };
  }
    catch (error) {
      console.error("Get file error:", error);
      return { success: false, message: error.message };
    }
  }
}

export default new BucketService();
