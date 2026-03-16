// Exemple 02 - Serveur Express basique (mode modules ES)

import express from 'express';

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Logger simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route GET /
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Express');
});

// Route GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello depuis Express !');
});

// Route GET /users/:id
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id, name: `Utilisateur ${id}` });
});

app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});

