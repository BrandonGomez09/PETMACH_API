const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false, // Oculta los logs de SQL en la consola
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Obligatorio para Render
            }
        }
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

// ¡Esta es la línea clave que había omitido!
module.exports = { sequelize, conectarDB };