/**
 * TRAVAIL PRATIQUE 04 - CRUD UTILISATEURS AVEC EXPRESS
 *
 * Objectif : créer une API REST complète pour gérer des utilisateurs en mémoire.
 *
 * Pré-requis :
 * - Projet initialisé (npm init -y)
 * - "type": "module" dans package.json
 * - Express installé : npm install express
 *
 * Consignes :
 * 1. Créez un projet "api-crud-users" avec la structure :
 *    - app.js
 *    - users/users-data.js
 *    - users/users-routes.js
 *
 * 2. Dans users-data.js :
 *    - exportez un tableau "users" avec quelques utilisateurs de test.
 *
 * 3. Dans users-routes.js :
 *    - créez un Router Express
 *    - implémentez les routes suivantes (CRUD complet) :
 *      - GET    /users        → liste des utilisateurs
 *      - GET    /users/:id    → détail d'un utilisateur
 *      - POST   /users        → création (name obligatoire)
 *      - PUT    /users/:id    → mise à jour complète (name obligatoire)
 *      - DELETE /users/:id    → suppression
 *
 * 4. Dans app.js :
 *    - créez une app Express
 *    - utilisez express.json()
 *    - montez le routeur sur /users
 *    - démarrez le serveur sur le port 3000
 *
 * 5. Testez toutes les routes avec un outil (Postman, Thunder Client, etc.).
 *
 * Bonus :
 * - Ajoutez une validation basique des données (ex : name non vide, longueur minimale).
 * - Ajoutez un champ "email" et vérifiez qu'il contient un "@"
 *   (validation simple, sans regex compliquée).
 */

// Ce fichier ne contient que l'énoncé. Le code est à écrire dans votre projet.

