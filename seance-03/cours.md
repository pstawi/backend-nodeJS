# Séance 3 : Serveur HTTP et introduction à Express (mode modules)

## 📚 Objectifs de la séance

À la fin de cette séance, vous serez capable de :
- Créer un **serveur HTTP basique** avec le module `http`
- Répondre à des requêtes simples (URL, méthode)
- Comprendre les limites du serveur HTTP “maison”
- Installer et utiliser **Express** pour simplifier la création d’API
- Créer quelques routes GET simples avec Express

---

## 🌐 Rappel : rôle du backend

Le backend Node.js :

- reçoit des **requêtes HTTP** (GET, POST, etc.)
- applique de la **logique métier** (calcul, vérifications…)
- accède à la **base de données** (MySQL…)
- renvoie une **réponse** (JSON, HTML, texte…)

---

## 🧱 Créer un serveur HTTP basique (module `http`)

### Importer le module `http` (mode modules)

```js
import http from 'http';
```

### Exemple : serveur minimal

```js
// fichier server-http.js
import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bienvenue sur mon serveur HTTP Node.js');
  } else if (req.url === '/hello' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello depuis /hello');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Page non trouvée');
  }
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
```

Exécution :

```bash
node server-http.js
```

---

## 🔍 Limites du serveur HTTP “maison”

- Gestion des routes **à la main** (`if`, `else if` partout)
- Pas de gestion automatique :
  - du **JSON** dans le corps des requêtes
  - des **paramètres d’URL** (`/users/1`, etc.)
  - des **middlewares** (journalisation, sécurité…)

Pour des API plus complexes, on utilise un **framework** comme **Express**.

---

## ⚙️ Installation et configuration de base d’Express

### 1. Créer / se placer dans un dossier de projet

```bash
mkdir api-express
cd api-express
npm init -y
```

### 2. Activer le mode modules

Dans `package.json` :

```json
{
  "name": "api-express",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
```

### 3. Installer Express

```bash
npm install express
```

---

## 🚀 Premier serveur Express

```js
// fichier app.js
import express from 'express';

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON dans le corps des requêtes
app.use(express.json());

// Route GET /
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Express');
});

app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});
```

Exécution :

```bash
npm start
```

---

## 🧭 Routage de base avec Express

### Routes simples

```js
// GET /hello
app.get('/hello', (req, res) => {
  res.send('Hello depuis /hello');
});

// GET /json
app.get('/json', (req, res) => {
  res.json({ message: 'Réponse JSON', formation: 'DWWM' });
});
```

### Paramètres d’URL

```js
// GET /users/:id
app.get('/users/:id', (req, res) => {
  const id = req.params.id; // chaîne de caractères
  res.json({ id, name: `Utilisateur ${id}` });
});
```

### Query string (paramètres après `?`)

URL : `/search?q=node&limit=10`

```js
app.get('/search', (req, res) => {
  const { q, limit } = req.query;
  res.json({ query: q, limit });
});
```

---

## 🧱 Middlewares simples (logger)

Un **middleware** est une fonction qui reçoit `(req, res, next)` :

- il peut **lire** / **modifier** la requête
- il peut **terminer** la réponse
- ou appeler `next()` pour passer au suivant

### Exemple : logger global

```js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

Ce middleware s’exécutera **avant toutes les routes**.

---

## 🔚 Middleware de gestion d’erreurs (aperçu)

Un middleware d’erreur a **4 paramètres** :

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});
```

On le place **après** les routes.

---

## ✅ Bonnes pratiques

1. **Utiliser Express** pour les applications web/API dès qu’il y a plusieurs routes
2. **Toujours activer `express.json()`** si vous travaillez avec du JSON
3. **Logger les requêtes** (méthode + URL) pour le debug
4. **Garder `PORT` dans une constante** et, plus tard, dans une variable d’environnement (`process.env.PORT`)
5. **Tester vos routes avec un outil** comme Postman, Thunder Client ou le navigateur pour les GET simples

---

## 📚 Résumé

Dans cette séance, vous avez appris :
- ✅ À créer un serveur HTTP basique avec le module `http`
- ✅ Les limites du serveur HTTP “maison”
- ✅ À initialiser un projet Express en mode modules (`"type": "module"`)
- ✅ À créer quelques routes simples avec Express (`GET /`, `GET /hello`, etc.)
- ✅ La notion de middleware (logger, gestion d’erreurs)

---

## 🎯 Prochaines étapes

Dans la prochaine séance, nous verrons :
- Comment créer une **API REST simple** (CRUD en mémoire) avec Express
- Comment structurer les routes dans des **fichiers séparés**
- Comment préparer l’intégration d’une **base de données MySQL** dans l’API

