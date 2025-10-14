// src/vector/pineconeClient.js
import Pinecone from "@pinecone-database/pinecone";

let pinecone;
export default async function getPinecone() {
  if (pinecone) return pinecone;
  pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  return pinecone;
}
