import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// dotenv.config();

class CloudinaryService {
  constructor() {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Upload an image to Cloudinary
   * @param filePath - The local path to the image
   * @param folder - The folder in Cloudinary to store the image
   * @returns - A promise with the upload result
   */
  async uploadImage(base64Data: string,fileType:string, folder: string) {
    try {
      const result = await cloudinary.uploader.upload(`data:${fileType};base64,${base64Data}`, { folder });
      console.log("re" , result);
      return result;
    } catch (error) {
        console.log("Errorrrr" , error)
      throw new Error(`Cloudinary upload failed: ${(error as Error).message}`);
    }
  }

  /**
   * Delete an image from Cloudinary
   * @param publicId - The public ID of the image to delete
   * @returns - A promise with the result of the deletion
   */
  async deleteImage(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Cloudinary deletion failed: ${(error as Error).message}`);
    }
  }

  /**
   * Download an image from Cloudinary
   * @param publicUrl - The URL of the image to download
   * @param savePath - The local path to save the image
   */
  async downloadImage(publicUrl: string, savePath: string): Promise<void> {
    try {
      const response = await axios.get(publicUrl, { responseType: 'stream' });
      const writer = fs.createWriteStream(savePath);

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Failed to download image: ${(error as Error).message}`);
    }
  }
}

export default CloudinaryService;
