import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("./backend/.env"),
});

import express from "express";
import cors from "cors";
import helmet from "helmet";

import initFirebase from "./src/firebaseAdmin.js";
import candidatesRouter from "./src/routes/candidates.js";
import searchRouter from "./src/routes/search.js";
import ingestRouter from "./src/routes/ingest.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));

initFirebase();

app.use("/api/candidates", candidatesRouter);
app.use("/api/search", searchRouter);
app.use("/api/ingest", ingestRouter);

app.get("/_health", (req, res) => res.json({ ok: true, ts: Date.now() }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on ${port}`));
