import {GoogleGenAI, GenerateContentResponse} from '@google/genai';
import { retryRequest } from "@/lib/utils";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if(!GEMINI_API_KEY){
	throw new Error("Must Provide API Key")
}

const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const GEMINI_MODEL = "gemini-2.0-flash";

const systemInstruction = `
	
`

export async function fetchChatbotResponse(message, chatHistory) {
	const generationConfig = {
		temperature: 1,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 2048,
		responseMimeType: "text/plain",
		//systemInstruction: [systemPrompt(analysis)]
	};
	
	const formattedHistory = chatHistory.map((message) => (
		{
			role: message.role,
			parts: [{ text: message.content }]
		}
	))
	
	//initialize chat and get response
	const chat = genAI.chats.create({
		model: GEMINI_MODEL,
		history: formattedHistory,
		config: generationConfig,
	})

	const response = await chat.sendMessage({ message: message })// await retryRequest<GenerateContentResponse>(()=>chat.sendMessage({ message: message }))
	const reply = response.text

	return reply
}

export async function generateSummary (query, text){
  const systemInstruction = `
	You are an expert political analyst specialized in African governance and elections.
	Your task is to provide factual, neutral, and concise insights to help users understand candidates, their manifestos, and policies.

	You are provided with several political candidate manifestos and contextual data.
	When answering:
	- Focus on the **single most relevant candidate or manifesto** related to the user’s query.
	- Do **not** summarize every manifesto — instead, identify the **closest match** and elaborate briefly.
	- Be objective and avoid personal opinions or political bias.
	- If the query is too broad or unrelated to the provided context, say so briefly.
	- Respond in a well-structured, human-readable tone (not robotic).
	`;

	  const prompt = `
	User query: "${query}"

	Contextual political data:
	${text}

	Now, based on the above manifestos, provide a factual answer that best fits the user's query.
	`;
      const result = await genAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
		config: {
		  systemInstruction,
		  temperature: 0.6,
		},
	  });

      const summary = await result.text;
	  
	  return summary
}