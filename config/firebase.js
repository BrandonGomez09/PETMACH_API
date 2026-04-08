// config/firebase.js
const admin = require('firebase-admin');

// Importamos el archivo JSON con tu llave privada
const serviceAccount = require('./firebase-key.json');

// Inicializamos la conexión con Firebase
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin inicializado correctamente');
} catch (error) {
    console.error('❌ Error al inicializar Firebase Admin:', error);
}

// Exportamos la instancia para usarla en los controladores
module.exports = admin;