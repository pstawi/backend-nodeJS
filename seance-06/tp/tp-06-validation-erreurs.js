/**
 * TRAVAIL PRATIQUE 06 - VALIDATION & GESTION D'ERREURS AVANCÉE
 *
 * Objectif : améliorer votre API "clients" (MySQL) en ajoutant :
 * - un validateur dédié pour le body des requêtes
 * - une classe HttpError
 * - un middleware d'erreurs global
 * - des réponses JSON d'erreur cohérentes
 *
 * Pré-requis :
 * - Projet "api-mysql" de la séance 5 fonctionnel
 * - Architecture routes / controllers / models / config déjà en place
 *
 * Consignes :
 * 1. Créez un dossier "utils" avec un fichier "HttpError.js" :
 *    - classe HttpError(status, message, details)
 *    - hérite de Error
 *
 * 2. Créez un dossier "validators" avec un fichier "clientValidator.js" :
 *    - fonction validateClientPayload(payload) qui retourne un tableau d'erreurs (strings)
 *    - vérifiez :
 *      - nom : string, min 2 caractères
 *      - email : string, contient un "@"
 *
 * 3. Dans "clientController.js" :
 *    - utilisez validateClientPayload pour les routes POST et PUT
 *    - si erreurs → throw new HttpError(400, 'Validation error', errors)
 *    - utilisez aussi HttpError pour les cas 404 (client non trouvé)
 *
 * 4. Dans "app.js" :
 *    - après les routes, ajoutez un middleware d'erreurs global :
 *      app.use((err, req, res, next) => { ... });
 *    - s'il s'agit d'un HttpError :
 *      - status = err.status
 *      - body = { error: err.message, details?: err.details }
 *    - sinon :
 *      - logguez l'erreur
 *      - renvoyez 500 avec { error: 'Internal server error' }
 *
 * 5. Testez les cas suivants :
 *    - POST /clients avec un body invalide (nom vide, pas d'email, etc.)
 *    - GET /clients/:id avec un id qui n'existe pas
 *    - (si possible) provoquez une erreur SQL (ex: arrêt du serveur MySQL) et observez la réponse 500
 *
 * Bonus :
 * - Ajoutez un middleware qui transforme les Number.isNaN sur les IDs en HttpError 400
 * - Ajoutez un champ "code" dans HttpError (ex: "VALIDATION_ERROR", "NOT_FOUND")
 *   et renvoyez-le dans la réponse JSON.
 */

// Ce fichier contient uniquement l'énoncé du TP.

