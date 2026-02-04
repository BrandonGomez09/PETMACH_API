const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Hogar = sequelize.define('Hogar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreVoluntario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    tipoMascotaAceptada: {
        type: DataTypes.ENUM('Perros', 'Gatos', 'Ambos'),
        allowNull: false
    },
    suministrosDisponibles: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    ocupacionActual: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = Hogar;