# Séance 4 : API REST CRUD avec Express (mode modules)

## 📚 Objectifs de la séance

À la fin de cette séance, vous serez capable de :
- Expliquer ce qu’est une **API REST**
- Créer une API REST simple avec **Express**
- Implémenter les 4 opérations CRUD sur une ressource (en mémoire)
- Structurer un peu mieux votre code (séparation routes / données)
- Préparer l’intégration future d’une base de données (MySQL)

---

## 🔄 Rappel : CRUD & REST

### CRUD

| Lettre | Signification | Action        |
|--------|---------------|---------------|
| C      | Create        | Créer         |
| R      | Read         | Lire          |
| U      | Update       | Mettre à jour |
| D      | Delete       | Supprimer     |

### API REST

Une API REST utilise les **méthodes HTTP** et des **URL** pour manipuler des ressources.

Exemple pour une ressource `users` :

| Action             | Méthode | URL          |
|--------------------|---------|--------------|
| Liste des users    | GET     | `/users`     |
| Détail d’un user   | GET     | `/users/:id` |
| Créer un user      | POST    | `/users`     |
| Mettre à jour user | PUT     | `/users/:id` |
| Supprimer user     | DELETE  | `/users/:id` |

---

## 🧪 Données en mémoire (sans BDD pour l’instant)

Pour s’entraîner, on va stocker les données dans un **tableau en mémoire**.

```js
// users-data.js
export let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
```

> Attention : les données sont perdues dès qu’on redémarre le serveur (ce n’est pas persistant).

---

## 🧩 Implémenter un CRUD en mémoire

### 1. GET /users (liste)

```js
app.get('/users', (req, res) => {
  res.json(users);
});
```

### 2. GET /users/:id (détail)

```js
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  res.json(user);
});
```

### 3. POST /users (création)

```js
app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Le champ "name" est requis' });
  }

  const newUser = {
    id: Date.now(), // id simple pour l’exercice
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});
```

### 4. PUT /users/:id (mise à jour complète)

```js
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
```

### 5. DELETE /users/:id (suppression)

```js
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = users.length;
  users = users.filter(u => u.id !== id);

  if (users.length === before) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  res.status(204).send();
});
```

---

## 🧱 Structure de fichiers proposée

```text
api-crud/
├─ package.json
├─ app.js
└─ users/
   ├─ users-data.js
   └─ users-routes.js
```

### `users-data.js`

```js
export let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
```

### `users-routes.js`

```js
import express from 'express';
import { users as usersArray } from './users-data.js';

const router = express.Router();
let users = usersArray;

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  res.json(user);
});

// POST, PUT, DELETE à compléter comme dans les exemples ci-dessus

export default router;
```

### `app.js`

```js
import express from 'express';
import usersRouter from './users/users-routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Logger simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Monter le routeur /users
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`API CRUD démarrée sur http://localhost:${PORT}`);
});
```

---

## 🔗 Vers une vraie base de données (ouverture)

Pour l’instant :

- les données sont dans un **tableau en mémoire**
- tout est perdu à chaque redémarrage

Avec MySQL (dans une séance suivante) :

- on remplacera les opérations sur le tableau par des **requêtes SQL**
- les routes resteront **les mêmes** (`GET /users`, etc.)
- seule la “couche d’accès aux données” changera

---

## ✅ Bonnes pratiques

1. **Toujours valider les données d’entrée** (champs requis, types, etc.)
2. **Toujours gérer les cas 404** (ressource non trouvée)
3. **Utiliser les bons codes HTTP** (200, 201, 204, 400, 404…)
4. **Séparer les responsabilités** : routes dans un fichier, données/logique dans un autre
5. **Tester** chaque route (GET, POST, PUT, DELETE) avec un outil dédié

---

## 📚 Résumé

Dans cette séance, vous avez appris :
- ✅ Ce qu’est une API REST et le CRUD
- ✅ À créer un CRUD complet en mémoire avec Express
- ✅ À organiser les fichiers pour une ressource (`users`)
- ✅ Comment préparer le passage à une vraie base de données (MySQL)

---

## 🎯 Prochaines étapes

Dans la prochaine séance, nous verrons :
- Comment connecter l’API à une **base MySQL** (avec `mysql2`)
- Comment remplacer le tableau en mémoire par de vraies tables
- Comment gérer les erreurs liées à la base de données

