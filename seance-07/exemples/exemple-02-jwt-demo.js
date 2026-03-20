// Exemple 02 - Démonstration rapide de jsonwebtoken (à lancer avec node)

import jwt from 'jsonwebtoken';

const SECRET = 'CHANGEMOI_TRES_LONG_ET_COMPLEXE';

const payload = { id: 1, email: 'alice@example.com' };

// Génération
const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
console.log('Token :', token);

// Vérification
try {
  const decoded = jwt.verify(token, SECRET);
  console.log('Décodé :', decoded);
} catch (err) {
  console.error('Token invalide ou expiré');
}

