/**
 * TRAVAIL PRATIQUE 04 - CORRECTION (simplifiée)
 *
 * Exemple de code pour une API CRUD utilisateurs en mémoire.
 */

// users-data.js
export let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// users-routes.js (exemple)
// import express from 'express';
// import { users as usersArray } from './users-data.js';
//
// const router = express.Router();
// let users = usersArray;
//
// // LISTE
// router.get('/', (req, res) => {
//   res.json(users);
// });
//
// // DETAIL
// router.get('/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find(u => u.id === id);
//   if (!user) {
//     return res.status(404).json({ error: 'Utilisateur non trouvé' });
//   }
//   res.json(user);
// });
//
// // CREATION
// router.post('/', (req, res) => {
//   const { name, email } = req.body;
//   const errors = [];
//
//   if (!name || name.trim().length < 2) {
//     errors.push('Le nom est requis (min 2 caractères).');
//   }
//   if (!email || !email.includes('@')) {
//     errors.push('Email invalide.');
//   }
//
//   if (errors.length > 0) {
//     return res.status(400).json({ errors });
//   }
//
//   const newUser = {
//     id: Date.now(),
//     name: name.trim(),
//     email: email.trim()
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });
//
// // MISE A JOUR
// router.put('/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const { name, email } = req.body;
//
//   const index = users.findIndex(u => u.id === id);
//   if (index === -1) {
//     return res.status(404).json({ error: 'Utilisateur non trouvé' });
//   }
//
//   const errors = [];
//   if (!name || name.trim().length < 2) {
//     errors.push('Le nom est requis (min 2 caractères).');
//   }
//   if (!email || !email.includes('@')) {
//     errors.push('Email invalide.');
//   }
//
//   if (errors.length > 0) {
//     return res.status(400).json({ errors });
//   }
//
//   users[index] = {
//     id,
//     name: name.trim(),
//     email: email.trim()
//   };
//   res.json(users[index]);
// });
//
// // SUPPRESSION
// router.delete('/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const before = users.length;
//   users = users.filter(u => u.id !== id);
//
//   if (users.length === before) {
//     return res.status(404).json({ error: 'Utilisateur non trouvé' });
//   }
//
//   res.status(204).send();
// });
//
// export default router;
//
// app.js
// import express from 'express';
// import usersRouter from './users/users-routes.js';
//
// const app = express();
// const PORT = 3000;
//
// app.use(express.json());
//
// app.use('/users', usersRouter);
//
// app.listen(PORT, () => {
//   console.log(`API CRUD utilisateurs sur http://localhost:${PORT}`);
// });

