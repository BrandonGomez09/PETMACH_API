const express = require('express');
const router = express.Router();
const saludController = require('../controllers/saludController');

// Agregar registro de salud (solo admin)
router.post('/', saludController.agregarRegistroSalud);

// Ver historial clínico de una mascota (todos)
router.get('/mascota/:mascotaId', saludController.obtenerHistorialClinico);

module.exports = router;
