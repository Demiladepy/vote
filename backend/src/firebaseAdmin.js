import admin from "firebase-admin";
import fs from "fs";
import path from "path";

export default function initFirebase(){
  if (admin.apps.length) return admin.app();
  const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  const json = JSON.parse(fs.readFileSync(path.resolve(keyPath), "utf8"));
  admin.initializeApp({
    credential: admin.credential.cert(json),
   // storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
  console.log("Firebase Admin initialized");
  return admin.app();
}
