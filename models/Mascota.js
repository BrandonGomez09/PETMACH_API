const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Mascota = sequelize.define('Mascota', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.ENUM('Perro', 'Gato', 'Otro'),
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estadoSalud: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Saludable'
    },
    estado: {
        type: DataTypes.ENUM('Sin hogar', 'En acogida'),
        defaultValue: 'Sin hogar'
    },

    hogarId:{
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: null
    },

    fotoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Mascota;