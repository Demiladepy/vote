import { Router } from "express";
import { Request, Response } from "express";
import { ingestFile, queryContext } from "../controllers/pinecone.controller";
import { upload } from "../middlewares/upload.middleware"

const router = Router()

router.get("/", (req: Request, res: Response)=>(res.send("pinecone route active")))
router.post("/upload", upload.single('file'), ingestFile)
router.post("/context", queryContext)

export default router