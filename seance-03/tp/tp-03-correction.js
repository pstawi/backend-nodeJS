/**
 * TRAVAIL PRATIQUE 03 - CORRECTION (simplifiée)
 *
 * Exemple de fichier app.js pour la mini API Express.
 */

// app.js
// (Dans un vrai projet, ce fichier doit être séparé, ici tout est dans un seul pour la correction)

import express from 'express';

const app = express();
const PORT = 3000;

// Middleware logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route GET /
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API TP03");
});

// Route GET /time
app.get('/time', (req, res) => {
  const now = new Date().toISOString();
  res.json({ now });
});

// Route GET /hello/:name
app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Bonjour ${name}`);
});

app.listen(PORT, () => {
  console.log(`Serveur TP03 démarré sur http://localhost:${PORT}`);
});

