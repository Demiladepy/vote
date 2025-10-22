import "dotenv/config";

export const env = {
	firebase: {
		projectId: ,
		clientEmail: ,
		privateKey: ,
	},
	pinecone: {
		apiKey: ,
		index: ,
		environment: ,
	},
	port: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
}