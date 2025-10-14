import express from "express";
import { createEmbedding } from "../utils/embeddings.js";
import getPinecone from "../vector/pineconeClient.js";
import admin from "firebase-admin";
const router = express.Router();

router.post("/", async (req, res) => {
  // Body: { query, topK=5, filters? }
  try {
    const { query, topK = 5 } = req.body;
    if(!query) return res.status(400).json({ error: "query required" });
    const qEmbed = await createEmbedding(query);
    const pinecone = await getPinecone();
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    const result = await index.query({
      queryRequest: {
        topK,
        includeMetadata: true,
        vector: qEmbed
      }
    });
    // fetch docs from Firestore for provenance if needed
    const hits = result.matches || [];
    const docs = await Promise.all(hits.map(async m => {
      // try to get document text from Firestore
      let docData = null;
      try {
        const snap = await admin.firestore().collection("documents").doc(m.id).get();
        if (snap.exists) docData = snap.data();
      } catch(_){}
      return { score: m.score, id: m.id, metadata: m.metadata, doc: docData };
    }));
    return res.json({ ok:true, hits: docs });
  } catch(e){
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});

export default router;
