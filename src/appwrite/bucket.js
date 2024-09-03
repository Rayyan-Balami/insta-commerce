import { Client, Storage, ID } from "appwrite";
import { getENV } from "@/getENV";

class BucketService {
  constructor() {
    this.client = new Client()
      .setEndpoint(getENV("ENDPOINT"))
      .setProject(getENV("PROJECT_ID"));
    this.storage = new Storage(this.client);
  }

  async upload(bucketID, files=[]) {
    try {
      const promises = files.map(file => this.storage.createFile(bucketID, ID.unique(), file));
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

  async getFilePreview(bucketID, fileID) {
    try {
      const url = await this.storage.getFilePreview(bucketID, fileID);
      return { success: true, url };
    } catch (error) {
      console.error("Get file preview error:", error);
      return { success: false, message: error.message };
    }
  } 

}

export default new BucketService();