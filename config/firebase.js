const admin = require('firebase-admin');
const fs = require('fs');

let serviceAccount;

// Verificamos si estamos en el servidor de Render (Producción)
if (fs.existsSync('/etc/secrets/firebase-key.json')) {
    serviceAccount = require('/etc/secrets/firebase-key.json');
    console.log('🔒 Leyendo llave de Firebase desde Render Secrets');
} 
// Si no, asumimos que estamos en tu computadora (Local)
else {
    serviceAccount = require('./firebase-key.json');
    console.log('💻 Leyendo llave de Firebase desde archivo local');
}

// Inicializamos la conexión con Firebase
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin inicializado correctamente');
} catch (error) {
    console.error('❌ Error al inicializar Firebase Admin:', error);
}

module.exports = admin;