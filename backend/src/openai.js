// src/openai.js
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
export default openai;

// Re-export createEmbedding for compatibility
export { createEmbedding } from "./utils/embeddings.js";
