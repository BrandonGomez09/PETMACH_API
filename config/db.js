const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false, // Oculta los logs de SQL en la consola para que sea más limpia
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Obligatorio para que Render acepte la conexión
            }
        }
    }
);

module.exports = sequelize;