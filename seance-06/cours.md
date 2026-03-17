# Séance 6 : Validation et gestion d’erreurs avancée (Express + MySQL)

## 📚 Objectifs de la séance

À la fin de cette séance, vous serez capable de :
- Distinguer les **erreurs fonctionnelles** (400/404, données invalides) des **erreurs techniques** (500, BDD, crash)
- Mettre en place un **middleware d’erreurs global** dans Express
- Structurer une **réponse d’erreur JSON cohérente**
- Ajouter une validation plus avancée sur les données d’entrée (sans et avec petite librairie)

On part de l’architecture : `routes` / `controllers` / `models` / `config`.

---

## 🔍 Types d’erreurs côté backend

### Erreurs fonctionnelles (attendues)

Exemples :

- Données manquantes ou invalides (`name` vide, email incorrect, etc.)
- Ressource non trouvée (`GET /clients/9999` inexistant)
- Mauvaise méthode HTTP

On renvoie :

- codes 4xx (`400`, `404`, parfois `409`, etc.)
- un corps JSON clair :

```json
{
  "error": "Validation error",
  "details": ["Le nom est requis", "Email invalide"]
}
```

### Erreurs techniques (inattendues)

Exemples :

- Connexion MySQL KO
- Timeout, crash, bug dans le code

On renvoie :

- code `500` (Erreur interne serveur)
- un message générique côté client (on ne montre pas les détails SQL)

---

## 🧱 Structure standard d’une erreur JSON

On choisit un format simple et constant :

```json
{
  "error": "Validation error",
  "details": [
    "Le champ nom est requis",
    "Email invalide"
  ]
}
```

Pour une 404 :

```json
{
  "error": "Not found",
  "details": ["Client non trouvé"]
}
```

Pour une 500 :

```json
{
  "error": "Internal server error"
}
```

---

## ⚙️ Middleware d’erreurs global dans Express

### Principe

- Un middleware d’erreurs a **4 paramètres** : `(err, req, res, next)`
- Il doit être **déclaré après toutes les routes**
- On peut y centraliser :
  - le log d’erreur (`console.error`)
  - le choix du **code HTTP**
  - le format JSON de la réponse

### Exemple simple

```js
// app.js
app.use((err, req, res, next) => {
  console.error(err); // log complet côté serveur

  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  const details = err.details || undefined;

  const payload = { error: message };
  if (details) {
    payload.details = details;
  }

  res.status(status).json(payload);
});
```

Pour l’utiliser, on peut créer des erreurs personnalisées dans les contrôleurs et les passer à `next(err)`.

---

## 🧠 Créer une petite classe d’erreurs HTTP

```js
// utils/HttpError.js
export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
```

Utilisation dans un contrôleur :

```js
import { HttpError } from '../utils/HttpError.js';

export async function getClient(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new HttpError(400, 'Validation error', ['id doit être un nombre']);
    }

    const client = await getClientById(id);
    if (!client) {
      throw new HttpError(404, 'Not found', ['Client non trouvé']);
    }

    res.json(client);
  } catch (err) {
    next(err); // envoyé au middleware global
  }
}
```

---

## ✏️ Validation avancée (sans librairie)

On crée une fonction de validation qui retourne une **liste d’erreurs**.

```js
// validators/clientValidator.js
export function validateClientPayload(payload) {
  const errors = [];
  const { nom, email } = payload;

  if (!nom || typeof nom !== 'string' || nom.trim().length < 2) {
    errors.push('Le nom est requis (min 2 caractères).');
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Email invalide.');
  }

  return errors;
}
```

Dans le contrôleur :

```js
import { validateClientPayload } from '../validators/clientValidator.js';
import { HttpError } from '../utils/HttpError.js';

export async function createClientController(req, res, next) {
  try {
    const errors = validateClientPayload(req.body);
    if (errors.length > 0) {
      throw new HttpError(400, 'Validation error', errors);
    }

    const { nom, email } = req.body;
    const client = await createClient(nom.trim(), email.trim());
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
}
```

---

## 🧪 Gestion des erreurs SQL (exemple)

Dans un modèle, on peut laisser remonter l’erreur brute et la gérer dans le middleware global :

```js
// models/clientModel.js
import db from '../config/db.js';

export async function createClient(nom, email) {
  const [result] = await db.query(
    'INSERT INTO clients (nom, email) VALUES (?, ?)',
    [nom, email]
  );
  return { id: result.insertId, nom, email };
}
```

Dans le middleware global, on peut distinguer :

```js
app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof HttpError) {
    const payload = { error: err.message };
    if (err.details) payload.details = err.details;
    return res.status(err.status).json(payload);
  }

  // Exemple : erreur MySQL (code propre à mysql2)
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      error: 'Conflict',
      details: ['Cette valeur existe déjà en base']
    });
  }

  res.status(500).json({ error: 'Internal server error' });
});
```

---

## 🧱 Rappel du flux de gestion d’erreurs

1. **Requête** arrive sur la route
2. Le **contrôleur** valide les données
   - si invalide → `throw new HttpError(400, ...)`
3. Le contrôleur appelle le **model** (requête SQL)
   - si la BDD plante → `throw err` (erreur technique)
4. On appelle `next(err)` dans le `catch`
5. Le **middleware global** :
   - logge l’erreur
   - choisit le **status HTTP**
   - renvoie une réponse JSON cohérente

---

## ✅ Bonnes pratiques

1. Ne jamais laisser **fuiter des messages SQL** directement au client
2. Toujours **valider les données** en entrée (types, champs obligatoires)
3. Centraliser le **format de réponse d’erreur** (middleware global)
4. Distinguer clairement **erreurs métier** (4xx) et **erreurs techniques** (500)
5. Toujours terminer la chaîne avec une réponse JSON (pas de requêtes qui “pendouillent”)

---

## 📚 Résumé

Dans cette séance, vous avez appris :
- ✅ À structurer des réponses d’erreurs cohérentes en JSON
- ✅ À créer un middleware d’erreurs global dans Express
- ✅ À utiliser une petite classe `HttpError` pour les erreurs métier
- ✅ À valider proprement le `body` des requêtes via un validateur dédié

---

## 🎯 Prochaines étapes

Dans une prochaine séance, vous pourrez :
- Ajouter une **authentification** (login, JWT, routes protégées)
- Introduire les **variables d’environnement** pour sécuriser vos configs
- Ajouter des **tests automatisés** pour vérifier le comportement de vos erreurs

