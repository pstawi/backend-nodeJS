// Exemple 01 - Démonstration rapide de bcrypt (à lancer avec node)

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function run() {
  const plain = 'monSuperMotDePasse';

  const hash = await bcrypt.hash(plain, SALT_ROUNDS);
  console.log('Hash :', hash);

  const ok = await bcrypt.compare(plain, hash);
  console.log('Mot de passe correct ? ', ok);
}

run().catch(console.error);

