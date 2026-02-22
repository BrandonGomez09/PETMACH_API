// test_socket_client.js
// Script de prueba para verificar que el servidor emite eventos Socket.io
// Uso: node test_socket_client.js
// Requiere: npm install socket.io-client

const { io } = require('socket.io-client');

const socket = io('http://localhost:4000');

socket.on('connect', () => {
    console.log('✅ Conectado al servidor Socket.io  (id:', socket.id, ')');
    console.log('   Escuchando eventos: mascota_actualizada, mascota_eliminada, hogar_actualizado, hogar_eliminado');
    console.log('   Haz un POST/PUT/DELETE a las rutas REST y verás los eventos aquí.\n');
});

socket.on('mascota_actualizada', (data) => {
    console.log('🐾 [mascota_actualizada]', JSON.stringify(data, null, 2));
});

socket.on('mascota_eliminada', (data) => {
    console.log('🗑️  [mascota_eliminada]', JSON.stringify(data, null, 2));
});

socket.on('hogar_actualizado', (data) => {
    console.log('🏠 [hogar_actualizado]', JSON.stringify(data, null, 2));
});

socket.on('hogar_eliminado', (data) => {
    console.log('🗑️  [hogar_eliminado]', JSON.stringify(data, null, 2));
});

socket.on('connect_error', (err) => {
    console.error('❌ Error de conexión:', err.message);
    console.error('   Asegúrate de que el servidor está corriendo en http://localhost:4000');
});
