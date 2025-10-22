import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./env";

export const pinecone = new Pinecone({
  apiKey: env.pinecone.apiKey,
  environment: env.pinecone.environment,
});

export const pineconeIndex = pinecone.Index(env.pinecone.indexName);
