// src/pinecone.js
import getPinecone from "./vector/pineconeClient.js";

export async function upsertToPinecone(vectors) {
  const pinecone = await getPinecone();
  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  await index.upsert({ upsertRequest: { vectors } });
}
