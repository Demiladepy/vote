import { Router } from "express";
import { Request, Response } from "express";
import { ingestFile } from "../controllers/pinecone.controller";
import { upload } from "../middleware/upload.middleware"

const router = Router()

router.get("/", (req: Request, res: Response)=>(res.send("pinecone route active")))
router.post("/", upload('file'), ingestFile)

export default router