// Exemple 01 - CRUD en mémoire sur /users (mode modules ES)

import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// LISTE - GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// DETAIL - GET /users/:id
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  res.json(user);
});

// CREATION - POST /users
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Le champ "name" est requis' });
  }
  const newUser = { id: Date.now(), name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// MISE A JOUR - PUT /users/:id
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Le champ "name" est requis' });
  }

  users[index] = { id, name };
  res.json(users[index]);
});

// SUPPRESSION - DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = users.length;
  users = users.filter(u => u.id !== id);

  if (users.length === before) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`CRUD en mémoire sur http://localhost:${PORT}`);
});

