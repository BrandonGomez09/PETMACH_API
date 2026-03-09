const express = require('express');
const router = express.Router();
const interesController = require('../controllers/interesController');

// Registrar interés en una mascota
router.post('/', interesController.crearInteres);

// Obtener todos los interesados en una mascota específica (para admin)
router.get('/mascota/:id', interesController.obtenerInteresesPorMascota);

module.exports = router;
