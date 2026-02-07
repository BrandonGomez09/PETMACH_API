require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conectarDB, sequelize } = require('./config/db');


require('./models/Usuario');
require('./models/Mascota');
require('./models/Hogar');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/mascotas', require('./routes/mascotaRoutes'));
app.use('/api/hogares', require('./routes/hogarRoutes'));

// Conexión y Sincronización
const iniciarServidor = async () => {
    try {
        await conectarDB();
        await sequelize.sync({ alter: true }); 
        console.log('Tablas sincronizadas con PostgreSQL');

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

iniciarServidor();

