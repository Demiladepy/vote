
import express from "express";
import fs from "fs";
import path from "path";
import { createEmbedding } from "../openai.js";
import { upsertToPinecone } from "../pinecone.js";

const router = express.Router();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../');

router.post("/", async (req, res) => {
  try {
    const { file } = req.body;
    if (!file) return res.status(400).json({ error: "No file specified" });

    const filePath = path.join(projectRoot, `backend/src/data/${file}`);
    console.log("[INGEST] Looking for file at:", filePath);
    if (!fs.existsSync(filePath)) {
      console.error("[INGEST] File not found at:", filePath);
      return res.status(404).json({ error: `File not found in /data. Tried: ${filePath}` });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let processedCount = 0;

    for (const item of data) {
      const text = `${item.name}, ${item.party}, ${item.position}, ${item.manifesto}`;
      const embedding = await createEmbedding(text);

      await upsertToPinecone([
        {
          id: item.name,
          values: embedding,
          metadata: item
        }
      ]);

      processedCount++;
    }

    res.json({
      message: "Ingestion complete!",
      processed: processedCount
    });
  } catch (error) {
    console.error("Ingestion error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
