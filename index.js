require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const { conectarDB, sequelize } = require('./config/db');
const socketManager = require('./socket');

require('./models/Usuario');
require('./models/Mascota');
require('./models/Hogar');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/mascotas', require('./routes/mascotaRoutes'));
app.use('/api/hogares', require('./routes/hogarRoutes'));

// Crear servidor HTTP que comparte Express + Socket.io
const server = http.createServer(app);

// Inicializar Socket.io con el servidor HTTP
socketManager.init(server);

// Conexión y Sincronización
const iniciarServidor = async () => {
    try {
        await conectarDB();
        await sequelize.sync({ alter: true });
        console.log('Tablas sincronizadas con PostgreSQL');

        const PORT = process.env.PORT || 4000;
        server.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
            console.log(`Socket.io escuchando en ws://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

iniciarServidor();
