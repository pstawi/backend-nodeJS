/**
 * TRAVAIL PRATIQUE 05 - API EXPRESS + MYSQL AVEC ARCHITECTURE COMPLETE
 *
 * Objectif : mettre en place une API REST "clients" avec la structure :
 * - config/      → connexion MySQL
 * - models/      → requêtes SQL
 * - controllers/ → logique métier
 * - routes/      → définition des routes
 *
 * Pré-requis :
 * - MySQL installé et base créée (ma_base, table clients)
 * - mysql2 et express installés
 * - "type": "module" dans package.json
 *
 * Consignes :
 * 1. Créez un projet "api-mysql" avec l'arborescence :
 *    - app.js
 *    - config/db.js
 *    - models/clientModel.js
 *    - controllers/clientController.js
 *    - routes/clientRoutes.js
 *
 * 2. Dans config/db.js :
 *    - créez un pool mysql2/promise et exportez-le
 *    - pour l'instant, mettez la config en dur (host, user, password, database)
 *
 * 3. Dans models/clientModel.js :
 *    - implémentez les fonctions :
 *      - getAllClients()
 *      - getClientById(id)
 *      - createClient(nom, email)
 *      - updateClient(id, nom, email)
 *      - deleteClient(id)
 *
 * 4. Dans controllers/clientController.js :
 *    - implémentez les fonctions :
 *      - listClients
 *      - getClient
 *      - createClientController
 *      - updateClientController
 *      - deleteClientController
 *    - gérez les erreurs avec try/catch et codes HTTP adaptés
 *
 * 5. Dans routes/clientRoutes.js :
 *    - créez un Router et mappez les routes CRUD :
 *      - GET    /clients
 *      - GET    /clients/:id
 *      - POST   /clients
 *      - PUT    /clients/:id
 *      - DELETE /clients/:id
 *
 * 6. Dans app.js :
 *    - créez l'app Express
 *    - utilisez express.json()
 *    - montez les routes sur /clients
 *    - démarrez le serveur sur le port défini dans .env (ou 3000 par défaut)
 *
 * Bonus :
 * - Ajoutez une ressource supplémentaire (ex : produits) avec le même schéma
 * - Ajoutez une route GET /health qui vérifie la connexion MySQL
 */

// Ce fichier ne contient que l'énoncé. Le code de l'API est à écrire dans votre projet.

