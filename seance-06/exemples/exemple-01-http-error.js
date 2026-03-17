// Exemple 01 - Utilisation de HttpError et du middleware d'erreurs

// utils/HttpError.js
export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// controllers/demoController.js
// import { HttpError } from '../utils/HttpError.js';
//
// export function demoValidation(req, res, next) {
//   try {
//     const { value } = req.body;
//     if (!value) {
//       throw new HttpError(400, 'Validation error', ['Le champ "value" est requis']);
//     }
//     res.json({ ok: true, value });
//   } catch (err) {
//     next(err);
//   }
// }
//
// app.js (extrait) :
// import express from 'express';
// import { HttpError } from './utils/HttpError.js';
// import { demoValidation } from './controllers/demoController.js';
//
// const app = express();
// app.use(express.json());
//
// app.post('/demo', demoValidation);
//
// // middleware d'erreurs
// app.use((err, req, res, next) => {
//   console.error(err);
//
//   if (err instanceof HttpError) {
//     const payload = { error: err.message };
//     if (err.details) payload.details = err.details;
//     return res.status(err.status).json(payload);
//   }
//
//   res.status(500).json({ error: 'Internal server error' });
// });
//
// app.listen(3000, () => {
//   console.log('Serveur de démo sur http://localhost:3000');
// });

