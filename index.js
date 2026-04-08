require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const { conectarDB, sequelize } = require('./config/db');
const socketManager = require('./socket');

// Inicializar Firebase
require('./config/firebase');

const Usuario = require('./models/Usuario');
const Mascota = require('./models/Mascota');
const Hogar = require('./models/Hogar');
const Interes = require('./models/Interes');
const Salud = require('./models/Salud');

// ─── Asociaciones Sequelize ───────────────────
Interes.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Interes.belongsTo(Mascota, { foreignKey: 'mascotaId' });
Usuario.hasMany(Interes, { foreignKey: 'usuarioId' });
Mascota.hasMany(Interes, { foreignKey: 'mascotaId' });

Salud.belongsTo(Mascota, { foreignKey: 'mascotaId' });
Mascota.hasMany(Salud, { foreignKey: 'mascotaId' });
// ─────────────────────────────────────────────

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/mascotas', require('./routes/mascotaRoutes'));
app.use('/api/hogares', require('./routes/hogarRoutes'));
app.use('/api/intereses', require('./routes/interesRoutes'));
app.use('/api/salud', require('./routes/saludRoutes'));

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
