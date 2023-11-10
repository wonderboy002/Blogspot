import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
export class authService {
  client = new Client();
  account;
  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        return this.account.login(email, password);
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getAccount() {
    try {
      return this.account.get();
    } catch (error) {
      console.log("Appwrite error in getAccount()", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions("all");
    } catch (error) {
      console.log("error in logout() appwrite", error);
    }
  }
}
const Auth = new authService();
export default Auth;
