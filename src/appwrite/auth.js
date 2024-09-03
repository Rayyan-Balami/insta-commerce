import { getENV } from "@/getENV";
import { Client, Account } from "appwrite";

class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(getENV("ENDPOINT"))
      .setProject(getENV("PROJECT_ID"));
    this.account = new Account(this.client);
  }

  async login(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      const user = await this.account.get();
      return { success: true, session, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new AuthService();