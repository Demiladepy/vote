import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

export const env = {
	firebase: {
		projectId: process.env.FIREBASE_PROJECT_ID as string,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
		privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
	},
	pinecone: {
		apiKey: process.env.PINECONE_API_KEY as string,
		indexName: process.env.PINECONE_INDEX_NAME as string,
		environment: process.env.PINECONE_ENV as string,
	},
	port: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
}