import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./env";

export const pinecone = new Pinecone({
  apiKey: env.pinecone.apiKey,
  //environment: env.pinecone.environment,
});

const INDEX_NAME = env.pinecone.indexName;
const DIMENSION = 3072; // Gemini embedding vector size
const METRIC = "cosine";
const REGION = "us-east-1"; 
const CLOUD = "aws";

export const initPineconeIndex = async () => {
  console.log(`[Pinecone] Checking for index: ${INDEX_NAME}...`);

  const listResponse = await pinecone.listIndexes();
  const existing = (listResponse.indexes ?? []).find(
    (i) => i.name === INDEX_NAME
  );

  if (existing) {
    console.log(`[Pinecone] Index "${INDEX_NAME}" already exists.`);

    const indexDescription = await pinecone.describeIndex(INDEX_NAME);
    const currentDim = indexDescription.dimension;

    if (currentDim !== DIMENSION) {
      console.warn(
        `[Pinecone] Dimension mismatch: expected ${DIMENSION}, found ${currentDim}. Recreating index...`
      );

      // Delete the old index
      await pinecone.deleteIndex(INDEX_NAME);
      console.log(`[Pinecone] Deleted old index "${INDEX_NAME}".`);

      await new Promise((r) => setTimeout(r, 8000));

      await pinecone.createIndex({
        name: INDEX_NAME,
        dimension: DIMENSION,
        metric: METRIC,
        spec: {
          serverless: {
            cloud: CLOUD,
            region: REGION,
          },
        },
      });

      console.log(`[Pinecone] Recreated index "${INDEX_NAME}" successfully.`);
    } else {
      console.log(`[Pinecone] Index dimension matches. Skipping recreation.`);
    }
  } else {
    console.log(`[Pinecone] Index not found. Creating "${INDEX_NAME}"...`);
    await pinecone.createIndex({
      name: INDEX_NAME,
      dimension: DIMENSION,
      metric: METRIC,
      spec: {
        serverless: {
          cloud: CLOUD,
          region: REGION,
        },
      },
    });
    console.log(`[Pinecone] Index "${INDEX_NAME}" created successfully.`);
  }

  // Return a live index reference
  return pinecone.Index(INDEX_NAME);
};


let pineconeIndexPromise: Promise<ReturnType<typeof pinecone.Index>> | null = null;

export const getPineconeIndex = async () => {
  if (!pineconeIndexPromise) {
    pineconeIndexPromise = initPineconeIndex();
  }
  return pineconeIndexPromise;
};

//export const pineconeIndex = pinecone.Index(env.pinecone.indexName);
