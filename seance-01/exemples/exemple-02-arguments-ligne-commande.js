// Exemple 02 - Arguments de la ligne de commande
// Objectif : lire des valeurs passées après "node fichier.js ..."

// process.argv contient tous les arguments de la ligne de commande
// [0] = chemin vers node.exe
// [1] = chemin vers ce fichier
// [2...] = arguments fournis par l'utilisateur

const args = process.argv.slice(2);

const prenom = args[0] || 'inconnu';
const formation = args[1] || 'DWWM';

console.log(`Bonjour ${prenom}, bienvenue en formation ${formation} !`);

