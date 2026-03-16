/**
 * TRAVAIL PRATIQUE 01 - CORRECTION
 */

// Message simple
console.log("Bonjour, je m'appelle [Votre prénom] et je suis en formation DWWM.");

// Affichage brut de tous les arguments
console.log('process.argv complet :', process.argv);

// On retire les 2 premiers éléments (node.exe et chemin du fichier)
const args = process.argv.slice(2);
console.log('Arguments utiles :', args);

// Récupération des valeurs
const prenom = args[0] || '[Prénom par défaut]';
const formation = args[1] || 'DWWM';

// Message personnalisé
console.log(`Bonjour ${prenom}, bienvenue en formation ${formation} !`);

