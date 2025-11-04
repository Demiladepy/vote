import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config";

//route imports
import pineconeRoutes from "./routes/pinecone.route";

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
];

app.use(
    cors({
        origin: function (origin, callback: Function) {
            // bypass the requests with no origin (like curl requests, mobile apps, etc )
            if (!origin) return callback(null, true);
        
            if (allowedOrigins.indexOf(origin) === -1) {
              var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
              return callback(new Error(msg), false);
            }
            return callback(null, true);
          },
      // origin: "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(express.json());
app.use(cookieParser());

//app routes
app.use("/pinecone", pineconeRoutes)

//test endpoint
app.use("/", (req: Request, res: Response) => {
	res.send("Server is running")
})

const PORT = env.port || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))