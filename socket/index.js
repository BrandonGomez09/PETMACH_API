// socket/index.js
// Singleton que guarda la instancia de Socket.io.
// Se inicializa una sola vez desde index.js y luego
// cualquier controlador puede hacer require('../socket').getIO()

let io;

module.exports = {
    /**
     * Inicializa Socket.io con el servidor HTTP de Node.
     * @param {import('http').Server} httpServer
     * @returns {import('socket.io').Server}
     */
    init: (httpServer) => {
        const { Server } = require('socket.io');
        io = new Server(httpServer, {
            cors: {
                origin: '*',       // En producción, reemplaza '*' por la URL de tu app
                methods: ['GET', 'POST', 'PUT', 'DELETE']
            }
        });

        io.on('connection', (socket) => {
            console.log(`[Socket.io] Cliente conectado: ${socket.id}`);
            socket.on('disconnect', () => {
                console.log(`[Socket.io] Cliente desconectado: ${socket.id}`);
            });
        });

        return io;
    },

    /**
     * Devuelve la instancia de Socket.io ya inicializada.
     * Lanza un error si se llama antes de init().
     * @returns {import('socket.io').Server}
     */
    getIO: () => {
        if (!io) {
            throw new Error('[Socket.io] El servidor aún no ha sido inicializado. Llama a init() primero.');
        }
        return io;
    }
};
