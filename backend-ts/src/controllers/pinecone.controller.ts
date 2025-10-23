import { Request, Response } from "express";
import { ingestFileService } from "../services/pinecone.service";

export const ingestFileController = async (req: Request, res: Response) => {
  try {
    const { file } = req.body;
    if (!file) {
      return res.status(400).json({ error: "No file specified" });
    }

    const result = await ingestFileService(file);

    return res.json({
      message: "Ingestion complete!",
      processed: result.processedCount,
    });
  } catch (error: any) {
    console.error("[Controller Error]", error);
    return res.status(500).json({ error: error.message });
  }
};
