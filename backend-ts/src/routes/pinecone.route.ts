import { Router } from "express";
import { Request, Response } from "express";
import { ingestFileController } from "../controllers/pinecone.controller";

const router = Router()

router.get("/", (req: Request, res: Response)=>(res.send("pinecone route active")))
router.post("/", ingestFileController)

export default router