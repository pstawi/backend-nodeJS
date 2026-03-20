# Séance 7 : Authentification – mots de passe hashés & JWT (Node.js / Express)

## 📚 Objectifs de la séance

À la fin de cette séance, vous serez capable de :
- Comprendre la différence entre **authentification** et **autorisation**
- Hacher des mots de passe avec `bcrypt`
- Mettre en place des routes `register` et `login`
- Générer et vérifier des **JWT** (JSON Web Tokens)
- Protéger des routes Express avec un middleware d’authentification

On reste sur l’architecture : `routes` / `controllers` / `models` / `config`.

---

## 🔐 Authentification vs autorisation

- **Authentification** : vérifier **qui** est l’utilisateur (login/mot de passe).
- **Autorisation** : vérifier **ce qu’il a le droit de faire** (droits, rôles).

Dans cette séance, on se concentre sur **l’authentification** simple.

---

## ⚙️ Préparation

Installation des dépendances dans un projet API existant (par ex. `api-mysql`) :

```bash
npm install bcrypt jsonwebtoken
```

On utilisera :

- `bcrypt` : pour **hacher** les mots de passe avant stockage
- `jsonwebtoken` : pour **créer** et **vérifier** des JWT

> Par simplicité, la clé secrète du JWT sera en dur dans le code (on la passera ensuite dans `.env` dans une séance sécurité).

---

## 🗄 Modèle utilisateur (simplifié)

### Table SQL d’exemple

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);
```

### Model `userModel.js`

```js
// models/userModel.js
import db from '../config/db.js';

export async function createUser(email, passwordHash) {
  const [result] = await db.query(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, passwordHash]
  );
  return { id: result.insertId, email };
}

export async function findUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT id, email, password_hash FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // undefined si non trouvé
}
```

---

## 🔑 Hachage de mot de passe avec bcrypt

### Pourquoi hacher ?

- Ne jamais stocker un mot de passe **en clair** dans la base.
- Si la base est compromise, les mots de passe ne doivent pas être lisibles.

### Exemple de hachage / vérification

```js
import bcrypt from 'bcrypt';

const PLAIN_PASSWORD = 'monSuperMotDePasse';
const SALT_ROUNDS = 10;

// Hachage
const hash = await bcrypt.hash(PLAIN_PASSWORD, SALT_ROUNDS);
console.log(hash);

// Vérification
const isMatch = await bcrypt.compare(PLAIN_PASSWORD, hash);
console.log(isMatch); // true
```

Dans notre API, on ne stockera que `password_hash`.

---

## 🧾 JWT : JSON Web Token

Un **JWT** est un jeton signé qui contient des informations sur l’utilisateur.

Exemples de contenu (`payload`) :

```json
{ "id": 1, "email": "alice@example.com" }
```

Le serveur :

- **génère** un token après un login réussi
- **vérifie** le token sur les routes protégées

### Exemple de génération / vérification

```js
import jwt from 'jsonwebtoken';

const SECRET = 'CHANGEMOI_TRES_LONG_ET_COMPLEXE'; // à déplacer plus tard dans .env

const payload = { id: 1, email: 'alice@example.com' };

// Génération (valable 1h)
const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

// Vérification
try {
  const decoded = jwt.verify(token, SECRET);
  console.log(decoded);
} catch (err) {
  console.error('Token invalide ou expiré');
}
```

---

## 🧠 Contrôleurs d’authentification

### `authController.js`

```js
// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';

// Clé JWT en dur pour l'instant (à sécuriser plus tard)
const JWT_SECRET = 'CHANGEMOI_TRES_LONG_ET_COMPLEXE';
const SALT_ROUNDS = 10;

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const errors = [];

    if (!email || !email.includes('@')) {
      errors.push('Email invalide.');
    }
    if (!password || password.length < 6) {
      errors.push('Mot de passe trop court (min 6 caractères).');
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation error', details: errors });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({
        error: 'Conflict',
        details: ['Un utilisateur avec cet email existe déjà']
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser(email, passwordHash);

    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
}
```

---

## 🧭 Routes d’authentification

```js
// routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
```

Montage dans `app.js` :

```js
import authRoutes from './routes/authRoutes.js';

app.use('/auth', authRoutes);
```

---

## 🛡 Middleware d’authentification JWT

```js
// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'CHANGEMOI_TRES_LONG_ET_COMPLEXE';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Format de token invalide' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}
```

Utilisation pour protéger une route :

```js
import { authMiddleware } from './middlewares/authMiddleware.js';

app.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

---

## ✅ Bonnes pratiques (intro)

1. **Ne jamais** stocker de mot de passe en clair → toujours haché (`bcrypt`).
2. Toujours renvoyer un message générique pour les identifiants invalides (`Invalid credentials`).
3. Ne jamais mettre la clé JWT en clair dans un repo public (ici c’est pour l’exercice). 
4. Prévoir une **expiration de token** (`expiresIn`) raisonnable.
5. Protéger toutes les routes sensibles (ex : `/clients`, `/orders`, etc.) avec un middleware d’authentification.

---

## 📚 Résumé

Dans cette séance, vous avez appris :
- ✅ À créer un modèle utilisateur avec mot de passe hashé
- ✅ À mettre en place des routes `register` et `login`
- ✅ À générer et vérifier des JWT
- ✅ À protéger des routes avec un middleware d’authentification

