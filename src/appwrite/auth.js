import { getENV } from "@/getENV";
import { Client, Account } from "appwrite";

class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(getENV("ENDPOINT"))
      .setProject(getENV("PROJECT_ID"));
    this.account = new Account(this.client);
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
      localStorage.removeItem("auth_session");
      localStorage.removeItem("user");
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const session = await this.account.getSession("current");
      const user = await this.account.get();
      return { success: true, user, session };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async oAuthLogin() {
    try {
      // This will automatically handle the OAuth login and redirect to the success URL
      this.account.createOAuth2Session(
        "google",
        "http://localhost:5173/oauth/success", // Success URL
        "http://localhost:5173/error" // Error URL
      );
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new AuthService();
