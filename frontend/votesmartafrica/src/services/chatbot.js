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