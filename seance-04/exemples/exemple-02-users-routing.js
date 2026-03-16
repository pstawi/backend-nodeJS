// Exemple 02 - Séparation des routes /users dans un Router Express (mode modules ES)

// users-data.js
export let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// users-routes.js
// import express from 'express';
// import { users as usersArray } from './users-data.js';
//
// const router = express.Router();
// let users = usersArray;
//
// router.get('/', (req, res) => {
//   res.json(users);
// });
//
// router.get('/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find(u => u.id === id);
//   if (!user) {
//     return res.status(404).json({ error: 'Utilisateur non trouvé' });
//   }
//   res.json(user);
// });
//
// export default router;
//
// app.js
// import express from 'express';
// import usersRouter from './users/users-routes.js';
//
// const app = express();
// app.use(express.json());
//
// app.use('/users', usersRouter);
//
// app.listen(3000, () => {
//   console.log('Serveur démarré sur http://localhost:3000');
// });

