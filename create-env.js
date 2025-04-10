require('dotenv').config();
const fs = require('fs');

// Ottieni la chiave API da variabile d'ambiente o utilizza un valore di default per lo sviluppo
const firebaseApiKey = process.env.FIREBASE_API_KEY || 'dev-key-for-local-testing';

const environmentTemplate = `export const environment = {
  production: false,
  firebaseAPIKey: '${firebaseApiKey}'
};`;

const environmentProdTemplate = `export const environment = {
  production: true,
  firebaseAPIKey: '${firebaseApiKey}'
};`;

// Assicurati che la directory esista
if (!fs.existsSync('./src/environments')) {
  fs.mkdirSync('./src/environments', { recursive: true });
}

fs.writeFileSync('./src/environments/environment.ts', environmentTemplate);
fs.writeFileSync('./src/environments/environment.prod.ts', environmentProdTemplate);

console.log('Environment files created successfully');
