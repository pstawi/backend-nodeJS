## Cours Backend Node.js – DWWM

Ce dossier contient le **support de cours Backend Node.js** pour la formation **DWWM**.  
Il est pensé pour être utilisé **séance par séance**, comme les cours HTML du même repo.

Chaque séance contient :
- un fichier `cours.md` : théorie + exemples commentés
- un dossier `exemples/` : petits fichiers de démonstration
- un dossier `tp/` : énoncés de TP + parfois une correction

Le cours se base sur **Node.js en mode modules ES** (`"type": "module"`) et sur **Express** pour le développement d’API.

---

### Prérequis généraux

- Node.js installé (version récente LTS conseillée)
- npm (fourni avec Node)
- Un éditeur de code (VS Code par exemple)
- Notions de base en JavaScript

---

### Vue d’ensemble des séances

- **`seance-01` – Introduction à Node.js**
  - Qu’est‑ce que Node.js ? Exécution JS côté serveur
  - Différences navigateur / Node
  - Premiers scripts (`console.log`, `process.argv`)
  - **TP01** : écrire et exécuter ses premiers scripts Node

- **`seance-02` – Modules, npm et structure de projet (mode modules ES)**
  - Modules ES (`import` / `export`)
  - `npm init`, `package.json`, scripts npm
  - Installation et utilisation d’une dépendance simple
  - **TP02** : mini‑calculatrice en ligne de commande avec modules + npm

- **`seance-03` – Serveur HTTP et introduction à Express**
  - Serveur HTTP natif (`http.createServer`)
  - Limites du “serveur maison”
  - Installation d’Express, première API (`GET /`, `GET /hello`…)
  - Middlewares simples et logger
  - **TP03** : mini API Express (quelques routes simples)

- **`seance-04` – API REST CRUD en mémoire**
  - Rappel REST & CRUD (Create/Read/Update/Delete)
  - Implémentation d’un CRUD complet `/users` en mémoire avec Express
  - Introduction à la séparation des routes (`Router`)
  - **TP04** : API CRUD utilisateurs en mémoire (avec validations simples)

- **`seance-05` – API Express + MySQL avec architecture complète**
  - Connexion MySQL avec `mysql2` (config en dur, sécurité vue plus tard)
  - Architecture recommandée :
    - `config/` : connexion MySQL
    - `models/` : requêtes SQL
    - `controllers/` : logique métier
    - `routes/` : définition des routes
  - CRUD `clients` complet connecté à une **vraie base MySQL**
  - **TP05** : mettre en place cette architecture sur un projet `api-mysql`

- **`seance-06` – Validation & gestion d’erreurs avancée**
  - Différence entre erreurs **fonctionnelles** (4xx) et **techniques** (5xx)
  - Classe `HttpError` pour centraliser les erreurs métier
  - Middleware d’erreurs global Express avec réponses JSON cohérentes
  - Validateurs dédiés (`validators/`) pour les données d’entrée
  - **TP06** : améliorer l’API `clients` avec validation avancée + erreurs propres

---

### TP fil rouge (projet complet)

Un TP long “mise en situation” est disponible dans :

- `TP-FIL-ROUGE/TP-projet-api-location-motos.md`

---

### Démarrer un projet d’exemple (mode modules ES)

Exemple minimal pour lancer une API Express :

```bash
mkdir mon-api
cd mon-api
npm init -y
npm install express
```

Dans `package.json` :

```json
{
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
```

Dans `app.js` :

```js
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Node.js / Express – DWWM');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
```

Lancement :

```bash
npm start
```

---

### Conseils d’utilisation pour les étudiants

- Lire d’abord le `cours.md` de la séance correspondante.
- Ouvrir les fichiers du dossier `exemples/` pour voir du **code minimal** fonctionnel.
- Faire le **TP sans regarder la correction**, puis comparer avec la solution proposée.
- Garder toujours la même architecture (routes / controllers / models / config) à partir de la séance 5.

Ce dossier est conçu pour progresser pas à pas, du **Hello World** Node.js jusqu’à une **API REST structurée** avec MySQL. 
