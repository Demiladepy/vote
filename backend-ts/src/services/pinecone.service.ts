import fs from "fs";
import path from "path";
//TODO 
//import { createEmbedding, upsertToPinecone } from "./pineconeHelpers";
//import { projectRoot } from "../config/constants";

export const ingestFileService = async (file: string) => {
  const filePath = path.join(projectRoot, `backend/src/data/${file}`);
  console.log("[INGEST] Looking for file at:", filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found in /data. Tried: ${filePath}`);
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
        metadata: item,
      },
    ]);

    processedCount++;
  }

  return { processedCount };
};
