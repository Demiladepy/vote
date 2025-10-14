import fs from "fs";
import path from "path";

const nigeria = JSON.parse(fs.readFileSync("./src/data/nigeria/candidates.json"));
const civil = JSON.parse(fs.readFileSync("./src/data/nigeria/civil.json"));
const global = JSON.parse(fs.readFileSync("./src/data/global/countries.json"));

const allDocs = [...nigeria, ...civil, ...global];
fs.writeFileSync("./src/data/combined_docs.json", JSON.stringify(allDocs, null, 2));
console.log("✅ Combined data file created successfully!");
