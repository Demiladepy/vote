import { Pinecone } from "@pinecone-database/pinecone";
const client = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = client.index(process.env.PINECONE_INDEX_NAME);

export async function upsertToPinecone(vectors) {
  await index.upsert(vectors);
}

export async function queryPinecone(vector) {
  const queryResponse = await index.query({
    vector,
    topK: 3, // Return top 3 closest matches
    includeMetadata: true,
  });
  return queryResponse.matches.map(match => match.metadata);
}
