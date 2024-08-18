import express from "express";
import ViteExpress from "vite-express";
import path from "path";

import { fileURLToPath } from "url";

// Utiliser fileURLToPath pour obtenir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

// Configuration for production build

// Servir le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route pour toutes les autres requêtes, renvoyer index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
