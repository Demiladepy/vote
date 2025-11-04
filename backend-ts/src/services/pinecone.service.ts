import axios from "axios";
import { createEmbedding, upsertToPinecone } from "../helpers/pinecone.helper";
import { getPineconeIndex } from "../config";

function extractTextForEmbedding(item: Record<string, any>): string {
  const preferredKeys = [
    "name", "party", "position", "manifesto", "summary",
    "topic", "description", "source", "year"
  ];

  return preferredKeys
    .filter(key => key in item && typeof item[key] === "string")
    .map(key => `${key}: ${item[key]}`)
    .join(", ");
}

export const processPineconeData = async (fileUrl: string): Promise<number> => {
  const { data } = await axios.get(fileUrl);
  let processedCount = 0;

  for (const item of data) {
    const text = extractTextForEmbedding(item);
    if (!text.trim()) continue; 
	console.log(text)
	
    const embedding = await createEmbedding(text);
	
	const id = item.id || item.name || item.topic || `record-${processedCount + 1}`;

    await upsertToPinecone([
      {
        id,
        values: embedding,
        metadata: item,
      },
    ]);

    processedCount++;
  }

  return processedCount;
};

export const queryPineconeIndex = async (query: string) => {
	const embedding = await createEmbedding(query);
	
	const index = await getPineconeIndex();
	
	if(!embedding) return null
	const searchResponse = await index.query({
      topK: 5,
      vector: embedding,
      includeMetadata: true,
    });
	
	return searchResponse
}
