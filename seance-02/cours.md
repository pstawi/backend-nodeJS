# Séance 2 : Modules Node.js, npm et structure d’un projet

## 📚 Objectifs de la séance

À la fin de cette séance, vous serez capable de :
- Comprendre la notion de **module** en Node.js
- Importer et exporter du code avec `import` et `export` (mode modules ES)
- Initialiser un projet avec `npm init`
- Comprendre le rôle de `package.json`
- Activer le mode modules avec `"type": "module"`
- Installer et utiliser une dépendance via npm

---

## 🧩 Qu’est‑ce qu’un module ?

Un **module** est un fichier qui contient du code **réutilisable**.

- Chaque fichier `.js` est un module
- Vous pouvez **exporter** des fonctions, objets, variables
- Vous pouvez les **importer** dans un autre fichier

Avantages :

- Organiser le code par **responsabilités**
- Réutiliser du code dans plusieurs fichiers
- Faciliter la maintenance et les tests

---

## 📦 Activer le “mode modules” (ES modules)

Pour utiliser `import` / `export` dans un projet Node.js, on active le **mode modules**.

### Méthode recommandée (tout le projet en modules)

Dans `package.json` :

```json
{
  "name": "mon-projet-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
```

> Avec `"type": "module"`, tous les fichiers `.js` du projet utilisent la syntaxe ES modules.

---

## 📦 Exporter et importer (ES modules)

### Exporter des fonctions nommées

```js
// fichier math.js
export function addition(a, b) {
  return a + b;
}

export function multiplication(a, b) {
  return a * b;
}
```

### Importer des fonctions nommées

```js
// fichier app.js
import { addition, multiplication } from './math.js';

console.log(addition(2, 3));        // 5
console.log(multiplication(4, 5));  // 20
```

### Export par défaut simple

```js
// fichier format-message.js
export default function formatMessage(nom) {
  return `Bonjour ${nom} !`;
}
```

```js
// fichier app.js
import formatMessage from './format-message.js';

console.log(formatMessage('Alice'));
```

---

## 📁 Organisation d’un petit projet Node.js

Exemple d’arborescence :

```text
mon-projet/
├─ package.json
├─ app.js
└─ src/
   ├─ math.js
   └─ utils.js
```

- `app.js` : point d’entrée
- `src/` : fichiers de logique métier (modules)
- `package.json` : configuration du projet

---

## 🧰 npm et package.json

### Initialiser un projet

Dans un dossier vide :

```bash
npm init -y
```

Cela crée un fichier `package.json` avec une configuration de base.

### Exemple de `package.json`

```json
{
  "name": "mon-projet-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "node app.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### Scripts npm

Dans `package.json` :

```json
"scripts": {
  "start": "node app.js",
  "test": "echo \"No tests yet\""
}
```

Dans le terminal :

```bash
npm start
npm test
```

---

## 📥 Installer une dépendance

### Installation

```bash
npm install dayjs
```

Cela :
- ajoute un dossier `node_modules/`
- ajoute `dayjs` dans `dependencies` de `package.json`

### Utilisation

```js
import dayjs from 'dayjs';

const maintenant = dayjs();
console.log('Date actuelle :', maintenant.format('YYYY-MM-DD HH:mm:ss'));
```

---

## 🛠️ Exemple de mini‑projet

Objectif : créer un petit outil en ligne de commande qui affiche un message formaté avec la date du jour.

1. Initialiser le projet

```bash
mkdir cli-bonjour
cd cli-bonjour
npm init -y
npm install dayjs
```

2. Créer `app.js` :

```js
import dayjs from 'dayjs';

const args = process.argv.slice(2);
const prenom = args[0] || 'inconnu';

const date = dayjs().format('DD/MM/YYYY HH:mm:ss');

console.log(`[${date}] Bonjour ${prenom}, bienvenue en Node.js !`);
```

3. Exécuter :

```bash
node app.js Pierre
```

---

## ✅ Bonnes pratiques

1. **Un module = une responsabilité principale**
2. **Nommer clairement les fichiers** (`math.js`, `format-date.js`, `user-service.js`, etc.)
3. **Éviter les chemins relatifs compliqués** (`../../..`) : organiser les dossiers proprement
4. **Toujours initialiser le projet avec `npm init`** avant d’installer des dépendances
5. **Ne pas modifier `node_modules` à la main**

---

## 📚 Résumé

Dans cette séance, vous avez appris :
- ✅ Ce qu’est un module en Node.js
- ✅ Comment activer le mode modules avec `"type": "module"`
- ✅ Comment exporter / importer avec `export` / `import`
- ✅ Comment structurer un petit projet Node.js
- ✅ Comment initialiser un projet avec `npm init -y`
- ✅ Comment installer et utiliser une dépendance avec `npm install`

---

## 🎯 Prochaines étapes

Dans la prochaine séance, nous verrons :
- Comment créer un **serveur HTTP** avec le module `http`
- Comment répondre à des requêtes simples (GET)
- Une introduction à **Express**, un framework pour construire des API plus facilement

