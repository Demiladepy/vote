import cloudinary from "../config/cloudinary.config";
import { UploadApiResponse } from "cloudinary";

export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: filename },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!);
      }
    );

    // Pipe the buffer to Cloudinary upload stream
    const stream = require("stream");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};
