/**
 * TRAVAIL PRATIQUE 07 - AUTHENTIFICATION & JWT
 *
 * Objectif : ajouter un système d'authentification basique à votre API (MySQL)
 * avec :
 * - routes /auth/register et /auth/login
 * - mots de passe hashés (bcrypt)
 * - JWT pour s'authentifier sur des routes protégées
 *
 * Pré-requis :
 * - Projet "api-mysql" (séance 5) fonctionnel
 * - Gestion des erreurs de base (séance 6) en place
 *
 * Consignes :
 * 1. Table users :
 *    - Créez une table "users" avec au minimum :
 *      id (INT, PK, AUTO_INCREMENT)
 *      email (VARCHAR, UNIQUE)
 *      password_hash (VARCHAR)
 *
 * 2. Model userModel.js :
 *    - fonctions :
 *      - createUser(email, passwordHash)
 *      - findUserByEmail(email)
 *
 * 3. Contrôleur authController.js :
 *    - register(req, res, next) :
 *      - valide email + password (min 6 caractères)
 *      - vérifie que l'email n'est pas déjà utilisé
 *      - hash le mot de passe (bcrypt)
 *      - crée l'utilisateur en BDD
 *      - renvoie { id, email }
 *
 *    - login(req, res, next) :
 *      - récupère l'utilisateur par email
 *      - vérifie le mot de passe avec bcrypt.compare
 *      - génère un JWT (jsonwebtoken) si OK
 *      - renvoie { token }
 *
 * 4. Routes authRoutes.js :
 *    - POST /auth/register  → register
 *    - POST /auth/login     → login
 *
 * 5. Middleware authMiddleware.js :
 *    - lit le header Authorization: Bearer <token>
 *    - vérifie le token (jsonwebtoken.verify)
 *    - si OK, ajoute req.user = payload du token
 *    - sinon, renvoie 401
 *
 * 6. Protéger une route :
 *    - par exemple GET /clients :
 *      - ajoutez authMiddleware avant le contrôleur
 *      - testez l'accès :
 *        - sans token → 401
 *        - avec mauvais token → 401
 *        - avec bon token → réponse normale
 *
 * Remarques :
 * - Pour l'instant, la clé secrète JWT peut être en dur dans le code.
 * - Plus tard, on la déplacera dans un fichier .env pour plus de sécurité.
 */

// Ce fichier contient uniquement l'énoncé du TP.

