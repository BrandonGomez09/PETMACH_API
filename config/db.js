// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la conexión
// OJO: En local suele ser usuario 'postgres' y la contraseña que pusiste al instalar
const sequelize = new Sequelize(
    process.env.DB_NAME || 'petmatch', 
    process.env.DB_USER || 'postgres', 
    process.env.DB_PASS || 'admin', // CAMBIA ESTO por tu contraseña de instalación
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false, // Para que no llene la consola de texto SQL
    }
);

const conectarDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado exitosamente a PostgreSQL');
    } catch (error) {
        console.error('❌ Error conectando a PostgreSQL:', error);
    }
};

module.exports = { sequelize, conectarDB };