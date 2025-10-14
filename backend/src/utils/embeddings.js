import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createEmbedding(text){
  // use OpenAI embeddings (or swap with local model)
  const resp = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: text
  });
  return resp.data[0].embedding;
}
