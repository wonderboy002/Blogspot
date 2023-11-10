import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";
export class databaseService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // async createPost({ title, content, slug, featuredImage, status, userid }) {
  //   try {
  //     return await this.database.createDocument(
  //       conf.databaseId,
  //       conf.collectionId,
  //       slug, //document_id,
  //       {
  //         title: title,
  //         content: content,
  //         featuredImage: featuredImage,
  //         status: status,
  //         userid: userid,
  //       }
  //     );
  //   } catch (e) {
  //     console.log("inside createPost :: Appwrite error", e);
  //   }
  // } orignal

  async createPost({ title, slug, Realcontent, featuredImage, status, userid }) {
    console.log("hello this is inside createPost",featuredImage);
    try {
      const document = {
        title: title,
        Realcontent: Realcontent,
        status: status,
        userid: userid,
      };
  
      if (featuredImage) {
        document.image = featuredImage;
      }
  
      return await this.database.createDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        document
      );
    } catch (e) {
      console.log("inside createPost :: Appwrite error", e);
    }
  }
  

  async updatePost(slug,{title, content,featuredImage, status}){
       try {
          return this.database.updateDocument(
            conf.databaseId,
            conf.collectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
          )
       }
       catch(e){
        console.log("error in updatePost Appwrite :: ",e);
       }
  }

  async deleteDocument(slug){
    try {
       this.database.deleteDocument(
        conf.databaseId,
        conf.collectionId,
        slug
       )
       return true;
    }
    catch(e){
        console.log("error in deletePost :: Appwrite",e);
        return false;
    }
  }

  async getPost(slug){
    try {
      return await this.database.getDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      )
    }
    catch (e){
        console.log("Error in getDocument :: Appwrite",e);
    }
  }

  async getPosts(queries=[Query.equal("status","active")]){
     try {
        return await this.database.listDocuments(
            conf.databaseId,
            conf.collectionId,
            queries
        )
     }
     catch(e){
        console.log("Error in getPosts Appwrite :: ",e);
     }
  }

  //file uploading service
  async uploadFile(file){
    try {
     return await this.bucket.createFile(
        conf.bucketId,
        ID.unique(),
        file
     )
    }
    catch(e){
        console.log("error in uploadFile",e);
    }
  }

  async deletefile(fileId){
    try {
      await this.bucket.deleteFile(
        conf.bucketId,
        fileId
      )
      return true;
    }
    catch(e){
        console.log("error in deleteFile :: Appwrite",e);
        return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.bucketId,
        fileId
    )
  }
}
const dbService = new databaseService();
export default dbService;
