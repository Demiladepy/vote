import { getPineconeIndex } from "../config";
import OpenAI from "openai";
import { GoogleGenAI } from '@google/genai';


//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
/*
export const createEmbedding = async (text: string): Promise<number[]> => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
};
*/

if(!process.env.GEMINI_API_KEY){
	throw new Error("Must Provide API Key")
}

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const GEMINI_MODEL = "gemini-embedding-001";

export const createEmbedding = async (text: string) => {
  try {

    const result = await genAI.models.embedContent({
        model: GEMINI_MODEL,
        contents: text,
    });
	
	if(result.embeddings) console.log("Processed embeddings: ", result.embeddings[0].values);
	
    return result.embeddings ? result.embeddings[0].values : [];
  } catch (error) {
    console.error("Error creating embedding with Gemini:", error);
    throw error;
  }
};

export const upsertToPinecone = async (vectors: any[]) => {
	const pineconeIndex  = await getPineconeIndex();
  await pineconeIndex.upsert(vectors);
};
