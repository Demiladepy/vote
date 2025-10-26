import axios from "axios";
import { createEmbedding, upsertToPinecone } from "../helpers/pinecone.helper";

export const processPineconeData = async (fileUrl: string): Promise<number> => {
  const { data } = await axios.get(fileUrl);
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

  return processedCount;
};
