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
  
      const bannerCount = banners.banners.length;
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

  async listDiscounts() {
    try {
      // Implement the logic to list discounts
      const discounts = await this.databases.listDocuments(
        getENV("DB_ID"),
        getENV("DISCOUNTS_COLLECTION_ID")
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