import { Request, Response } from "express";
import { uploadToCloudinary } from "../services/cloudinary.service";
import { processPineconeData } from "../services/pinecone.service";

export const ingestFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
	console.log(req.file.originalname)
    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    const fileUrl = result.secure_url;

    // Now process Pinecone ingestion from Cloudinary URL
    const processedCount = await processPineconeData(fileUrl);

    res.json({ message: "Ingestion complete!", processed: processedCount, source: fileUrl });
  } catch (error: any) {
    console.error("[INGEST ERROR]", error);
    res.status(500).json({ error: error.message });
  }
};
