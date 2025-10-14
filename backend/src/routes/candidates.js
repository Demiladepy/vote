// src/routes/candidates.js
import express from "express";
import admin from "firebase-admin";
const router = express.Router();

// Create candidate (admin-only: check token in production)
router.post("/", async (req, res) => {
  const payload = req.body;
  payload.createdAt = admin.firestore.FieldValue.serverTimestamp();
  const ref = await admin.firestore().collection("candidates").add(payload);
  res.json({ id: ref.id });
});

router.get("/:id", async (req, res) => {
  const snap = await admin.firestore().collection("candidates").doc(req.params.id).get();
  if (!snap.exists) return res.status(404).json({error:"not found"});
  res.json({ id: snap.id, ...snap.data() });
});

router.get("/", async (req, res) => {
  const q = await admin.firestore().collection("candidates").orderBy("lastName").limit(200).get();
  const items = q.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json({ items });
});

export default router;
