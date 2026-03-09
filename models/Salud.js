const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Salud = sequelize.define('Salud', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mascotaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diagnostico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vacuna: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fechaTratamiento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Salud;
