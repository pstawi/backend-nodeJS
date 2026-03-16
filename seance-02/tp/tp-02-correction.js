/**
 * TRAVAIL PRATIQUE 02 - CORRECTION (simplifiée, mode modules ES)
 */

// fichier math.js (à mettre normalement dans un fichier séparé)
export function addition(a, b) {
  return a + b;
}

export function soustraction(a, b) {
  return a - b;
}

// fichier app.js (exemple d'utilisation, à placer dans un autre fichier dans un vrai projet)
// import { addition, soustraction } from './math.js';
//
// const args = process.argv.slice(2);
// const a = Number(args[0]);
// const b = Number(args[1]);
// const operation = args[2];
//
// if (Number.isNaN(a) || Number.isNaN(b)) {
//   console.error('Veuillez fournir deux nombres valides.');
//   process.exit(1);
// }
//
// let resultat;
// if (operation === 'addition') {
//   resultat = addition(a, b);
// } else if (operation === 'soustraction') {
//   resultat = soustraction(a, b);
// } else {
//   console.error('Opération inconnue. Utilisez "addition" ou "soustraction".');
//   process.exit(1);
// }
//
// console.log('Résultat :', resultat);

