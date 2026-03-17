// Exemple 02 - Validateur simple pour un client

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

// controllers/clientController.js (extrait)
// import { validateClientPayload } from '../validators/clientValidator.js';
// import { HttpError } from '../utils/HttpError.js';
//
// export async function createClientController(req, res, next) {
//   try {
//     const errors = validateClientPayload(req.body);
//     if (errors.length > 0) {
//       throw new HttpError(400, 'Validation error', errors);
//     }
//
//     const { nom, email } = req.body;
//     const client = await createClient(nom.trim(), email.trim());
//     res.status(201).json(client);
//   } catch (err) {
//     next(err);
//   }
// }

