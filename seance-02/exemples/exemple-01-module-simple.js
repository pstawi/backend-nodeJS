// Exemple 01 - Module simple (math.js + app.js) en mode modules ES
// Ce fichier montre comment utiliser un module local avec "export" / "import".

// math.js (imaginer ce fichier dans le même dossier)
export function addition(a, b) {
  return a + b;
}

export function multiplication(a, b) {
  return a * b;
}

// app.js (exemple d'utilisation)
// import { addition, multiplication } from './math.js';
// console.log(addition(2, 3));
// console.log(multiplication(4, 5));

