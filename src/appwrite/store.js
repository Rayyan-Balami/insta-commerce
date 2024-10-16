import { Client, Databases, ID, Query } from "appwrite";
import { getENV } from "@/getENV";

class StoreService {
  constructor() {
    this.client = new Client()
      .setEndpoint(getENV("ENDPOINT"))
      .setProject(getENV("PROJECT_ID"));
    this.databases = new Databases(this.client);
  }

  async updateGeneral(documentID, data) {
    try {
     
      const result = await this.databases.updateDocument(
        getENV("DB_ID"),
        getENV("STORE_GENERAL_COLLECTION_ID"),
        documentID,
        {
          ...data,
          pickupLocations: JSON.stringify(data.pickupLocations),
          deliveryLocations: JSON.stringify(data.deliveryLocations),
        }
      );

      return { success: true, result };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }

  async listGeneral() {
    try {
      const result = await this.databases.listDocuments(
        getENV("DB_ID"),
        getENV("STORE_GENERAL_COLLECTION_ID")
      );

      return { success: true, result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateContact(documentID, data) {
    try {
      const result = await this.databases.updateDocument(
        getENV("DB_ID"),
        getENV("STORE_CONTACT_COLLECTION_ID"),
        documentID,
        {
          ...data,
          email2: data.email2 === "" ? null : data.email2,
          tel2: data.tel2 === "" ? null : data.tel2,
          facebook: data.facebook === "" ? null : data.facebook,
          twitter: data.twitter === "" ? null : data.twitter,
          linkedin: data.linkedin === "" ? null : data.linkedin,
          instagram: data.instagram === "" ? null : data.instagram,
          youtube: data.youtube === "" ? null : data.youtube,
          tiktok: data.tiktok === "" ? null : data.tiktok,
        }
      );

      return { success: true, result };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }

  async listContact() {
    try {
      const result = await this.databases.listDocuments(
        getENV("DB_ID"),
        getENV("STORE_CONTACT_COLLECTION_ID")
      );

      return { success: true, result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getStore() {
    try {
      const general = await this.listGeneral();
      const contact = await this.listContact();

      //only return the first result.document in the list, if result.total is 0 return an empty object

      return {
        success: true,
        result: {
          general: general.result.documents[0] || {},
          contact: contact.result.documents[0] || {},
        },
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new StoreService();

new StoreService().getStore();
