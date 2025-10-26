import { Router } from "express";
import { Request, Response } from "express";
import { ingestFile } from "../controllers/pinecone.controller";
import { upload } from "../middlewares/upload.middleware"

const router = Router()

router.get("/", (req: Request, res: Response)=>(res.send("pinecone route active")))
router.post("/", upload.single('file'), ingestFile)

export default router