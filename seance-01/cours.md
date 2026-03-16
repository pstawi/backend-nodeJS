# Séance 1 : Introduction à Node.js et exécution JavaScript côté serveur

## 📚 Objectifs de la séance

À la fin de cette séance, vous serez capable de :
- Expliquer ce qu’est Node.js et son rôle dans une application web
- Installer et vérifier Node.js et npm
- Exécuter un fichier JavaScript avec Node
- Comprendre la différence entre exécution dans le navigateur et côté serveur
- Utiliser `console.log` et lire les arguments de la ligne de commande

---

## 🌐 Qu’est‑ce que Node.js ?

**Node.js** est un environnement d’exécution JavaScript **côté serveur**.

- Il permet d’exécuter du JavaScript **en dehors** du navigateur
- Il est basé sur le moteur **V8** de Google (le même que Chrome)
- Il est conçu pour des applications **réactives**, **scalables**, souvent **orientées réseau** (API, temps réel, etc.)
- Il utilise un **modèle asynchrone** et **évènementiel**

### Node.js dans une architecture web classique (DWWM)

| Côté | Rôle | Technologies typiques |
|------|------|------------------------|
| Frontend (client) | Interface utilisateur | HTML, CSS, JavaScript (React, Vue, etc.) |
| Backend (serveur) | Logique métier, API, accès BDD | Node.js, Express, MySQL, etc. |
| Base de données | Stockage persistant | MySQL, PostgreSQL, MongoDB… |

Node.js se situe donc **entre** le navigateur et la base de données.

---

## 💻 Installation et vérifications

1. Télécharger Node.js depuis le site officiel (`nodejs.org`)
2. Installer la version LTS (recommandée)
3. Vérifier dans un terminal (PowerShell, CMD, Git Bash…) :

```bash
node -v
npm -v
```

Vous devez voir s’afficher des numéros de version, par exemple :

```bash
v22.0.0
10.5.0
```

---

## 🧠 Node.js vs JavaScript dans le navigateur

### En commun

- Même langage : **JavaScript**
- Même syntaxe de base (variables, fonctions, objets, tableaux…)

### Différences principales

| Aspect        | Navigateur                             | Node.js                                       |
|--------------|-----------------------------------------|-----------------------------------------------|
| Contexte     | Page web                               | Serveur, scripts, outils en ligne de commande |
| APIs         | DOM, `window`, `document`, `fetch`…    | `fs`, `http`, `path`, accès système de fichiers |
| Sécurité     | Fortement limité                       | Plus de droits (fichiers, réseau, etc.)      |
| Utilisation  | Interactions utilisateur                | API, scripts, traitement de données, BDD…    |

**Important :** Dans Node.js, vous **n’avez pas** accès à `document`, `window`, etc.

---

## 📝 Votre premier script Node.js

Créez un fichier `hello.js` avec le contenu suivant :

```js
console.log('Bonjour depuis Node.js !');
```

Dans un terminal, placez‑vous dans le dossier du fichier, puis exécutez :

```bash
node hello.js
```

Vous devez voir :

```bash
Bonjour depuis Node.js !
```

---

## 🎯 Arguments de la ligne de commande (`process.argv`)

Node fournit l’objet global `process`. La propriété `argv` contient les arguments passés au script.

```js
// fichier bonjour.js
console.log(process.argv);
```

Exécution :

```bash
node bonjour.js Pierre DWWM
```

Sortie possible :

```bash
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\chemin\\vers\\bonjour.js',
  'Pierre',
  'DWWM'
]
```

Pour récupérer uniquement les arguments utiles :

```js
const args = process.argv.slice(2); // retire node.exe et le chemin du fichier
const prenom = args[0];
const formation = args[1];

console.log(`Bonjour ${prenom}, bienvenue en ${formation} !`);
```

---

## 🔁 Entrée / sortie standard (console)

### Sortie : `console.log`, `console.error`

```js
console.log('Message d’information');
console.error('Message d’erreur');
```

### Entrée : `readline` (aperçu)

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Quel est votre nom ? ', (nom) => {
  console.log(`Bonjour ${nom} !`);
  rl.close();
});
```

---

## ✅ Bonnes pratiques (dès la séance 1)

1. **Nommer clairement vos fichiers** : `hello.js`, `bonjour-utilisateur.js`, etc.
2. **Une seule responsabilité par fichier** (un but principal)
3. **Utiliser `console.log` pour comprendre ce qui se passe**
4. **Toujours tester vos scripts dans le terminal**
5. **Sauvegarder fréquemment** vos fichiers avant d’exécuter `node`

---

## 📚 Résumé

Dans cette séance, vous avez appris :
- ✅ Ce qu’est Node.js et son rôle dans une application web
- ✅ La différence entre JavaScript dans le navigateur et Node.js
- ✅ Comment vérifier l’installation de Node et npm
- ✅ Comment exécuter un fichier JavaScript avec la commande `node`
- ✅ Comment lire des arguments de la ligne de commande avec `process.argv`

---

## 🎯 Prochaines étapes

Dans la prochaine séance, nous verrons :
- Les **modules** Node.js (`require`, `module.exports`)
- L’utilisation de **npm** et de `package.json`
- La structure d’un petit projet backend Node.js

