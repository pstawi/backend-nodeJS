# Séance 5 : API Express + MySQL avec architecture routes / controllers / models / config

## 📚 Objectifs de la séance

À la fin de cette séance, vous serez capable de :
- Mettre en place une API Express connectée à **MySQL** via `mysql2`
- Organiser votre projet avec :
  - un dossier `routes` pour les routes
  - un dossier `controllers` pour la logique métier
  - un dossier `models` pour l’accès aux données (requêtes SQL)
  - un dossier `config` pour la configuration (connexion MySQL, etc.)
- Implémenter un CRUD simple sur une ressource `clients`

Le tout en **mode modules ES** (`"type": "module"`).

---

## 🗂 Architecture du projet

Exemple d’arborescence :

```text
api-mysql/
├─ package.json
├─ app.js
├─ config/
│  └─ db.js
├─ models/
│  └─ clientModel.js
├─ controllers/
│  └─ clientController.js
└─ routes/
   └─ clientRoutes.js
```

Rôles :

- `config/db.js` : configuration de la connexion MySQL
- `models/` : requêtes SQL (accès aux données)
- `controllers/` : logique métier (appeler les models, traiter les résultats)
- `routes/` : définition des URL et méthode HTTP, appel d’un contrôleur
- `app.js` : point d’entrée, création du serveur Express, montage des routes

---

## ⚙️ Préparation du projet

Dans un nouveau dossier `api-mysql` :

```bash
mkdir api-mysql
cd api-mysql
npm init -y
npm install express mysql2
```

Dans `package.json`, activer le mode modules :

```json
{
  "name": "api-mysql",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.0.0",
    "mysql2": "^3.0.0"
  }
}
```

Pour simplifier (et aborder la sécurité plus tard), nous allons mettre la configuration **en dur** dans le code.

---

## 🧩 config/db.js – Connexion MySQL

```js
// config/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'motdepasse',
  database: 'ma_base',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
```

On utilise un **pool de connexions** pour réutiliser les connexions MySQL.

---

## 🗄 models/clientModel.js – Accès aux données

```js
// models/clientModel.js
import db from '../config/db.js';

export async function getAllClients() {
  const [rows] = await db.query('SELECT id, nom, email FROM clients');
  return rows;
}

export async function getClientById(id) {
  const [rows] = await db.query(
    'SELECT id, nom, email FROM clients WHERE id = ?',
    [id]
  );
  return rows[0]; // undefined si non trouvé
}

export async function createClient(nom, email) {
  const [result] = await db.query(
    'INSERT INTO clients (nom, email) VALUES (?, ?)',
    [nom, email]
  );
  return { id: result.insertId, nom, email };
}

export async function updateClient(id, nom, email) {
  await db.query(
    'UPDATE clients SET nom = ?, email = ? WHERE id = ?',
    [nom, email, id]
  );
  return { id, nom, email };
}

export async function deleteClient(id) {
  const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);
  return result.affectedRows; // 0 si rien supprimé, 1 si OK
}

export async function getClientsByFilters(filters) {
  let query = 'SELECT id, nom, email FROM clients WHERE 1=1';
  const params = [];

  if (filters.nom && filters.nom.trim() !== '') {
    query += ' AND nom LIKE ?';
    params.push(`%${filters.nom.trim()}%`);
  }

  if (filters.email && filters.email.trim() !== '') {
    query += ' AND email LIKE ?';
    params.push(`%${filters.email.trim()}%`);
  }

  if (filters.id) {
    query += ' AND id = ?';
    params.push(Number(filters.id));
  }

  const [rows] = await db.query(query, params);
  return rows;
}
```

---

## 🔎 Filtrage via `req.query` (querystring)

Dans Express, les paramètres passés dans l’URL (partie `? ...`) sont accessibles via `req.query`.

### 1) Exemple de requêtes

- Tous les clients : `GET http://localhost:3000/clients`
- Filtrer par nom : `GET http://localhost:3000/clients?nom=Al`
- Filtrer par email : `GET http://localhost:3000/clients?email=example.com`
- Filtrer par id : `GET http://localhost:3000/clients?id=3`
- Combiner plusieurs filtres : `GET http://localhost:3000/clients?nom=Al&email=example.com`

### 2) Principe

1. Dans le controller, on récupère les paramètres avec `const filters = req.query`.
2. On transmet ces filtres au model (ici `getClientsByFilters(filters)`).
3. Le model construit la requête SQL dynamiquement, tout en gardant des requêtes paramétrées (`?`) pour éviter l’injection SQL.

> Note : `req.query` renvoie généralement des valeurs sous forme de `string` (donc attention à la conversion en `Number` pour `id` si nécessaire).

### 3) Adapter le controller

Ici, on remplace l’appel à `getAllClients()` par `getClientsByFilters(req.query)`.

```js
// controllers/clientController.js
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientsByFilters
} from '../models/clientModel.js';

export async function listClients(req, res) {
  try {
    // req.query contient { nom, email, id } (valeurs en string)
    const clients = await getClientsByFilters(req.query);
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
```

Comme `getClientsByFilters()` commence par `WHERE 1=1` et n’ajoute des conditions que si un filtre est présent, la route `GET /clients` renverra bien **tous** les clients quand `req.query` est vide.

---

## 🧠 controllers/clientController.js – Logique métier

```js
// controllers/clientController.js
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '../models/clientModel.js';

export async function listClients(req, res) {
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function getClient(req, res) {
  try {
    const id = Number(req.params.id);
    const client = await getClientById(id);
    if (!client) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function createClientController(req, res) {
  try {
    const { nom, email } = req.body;
    const errors = [];

    if (!nom || nom.trim().length < 2) {
      errors.push('Le nom est requis (min 2 caractères).');
    }
    if (!email || !email.includes('@')) {
      errors.push('Email invalide.');
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const client = await createClient(nom.trim(), email.trim());
    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function updateClientController(req, res) {
  try {
    const id = Number(req.params.id);
    const { nom, email } = req.body;

    const existing = await getClientById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }

    const errors = [];
    if (!nom || nom.trim().length < 2) {
      errors.push('Le nom est requis (min 2 caractères).');
    }
    if (!email || !email.includes('@')) {
      errors.push('Email invalide.');
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const client = await updateClient(id, nom.trim(), email.trim());
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export async function deleteClientController(req, res) {
  try {
    const id = Number(req.params.id);
    const affected = await deleteClient(id);
    if (affected === 0) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
```

---

## 🧭 routes/clientRoutes.js – Routes Express

```js
// routes/clientRoutes.js
import express from 'express';
import {
  listClients,
  getClient,
  createClientController,
  updateClientController,
  deleteClientController
} from '../controllers/clientController.js';

const router = express.Router();

router.get('/', listClients);
router.get('/:id', getClient);
router.post('/', createClientController);
router.put('/:id', updateClientController);
router.delete('/:id', deleteClientController);

export default router;
```

---

## 🚀 app.js – Point d’entrée

```js
// app.js
import express from 'express';
import clientRoutes from './routes/clientRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Logger simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Monter les routes /clients
app.use('/clients', clientRoutes);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.listen(PORT, () => {
  console.log(`API MySQL démarrée sur http://localhost:${PORT}`);
});
```

---

## 🧪 Préparation de la base MySQL

Exemple de table `clients` :

```sql
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL
);
```

Vérifiez la connexion en testant la route :

- `GET http://localhost:3000/clients`

Puis en créant un client :

- `POST http://localhost:3000/clients` avec un JSON :

```json
{
  "nom": "Alice",
  "email": "alice@example.com"
}
```

---

## ✅ Bonnes pratiques

1. (Plus tard) déplacer les mots de passe hors du code dans un `.env` ou un gestionnaire de secrets
2. **Séparer clairement** routes / controllers / models / config
3. **Toujours gérer les erreurs** (try/catch, statuts HTTP adaptés)
4. **Valider les données** avant d’appeler le model
5. **Logguer les erreurs côté serveur**, mais ne pas exposer les détails SQL au client

---

## 📚 Résumé

Dans cette séance, vous avez appris :
- ✅ À organiser un projet Express avec `routes`, `controllers`, `models`, `config`
- ✅ À se connecter à MySQL avec `mysql2` (pool de connexions)
- ✅ À implémenter un CRUD `clients` complet avec de vraies requêtes SQL
- ✅ À utiliser `.env` pour la configuration

