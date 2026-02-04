const express = require('express');
const router = express.Router();
const hogarController = require('../controllers/hogarController');

// CRUD de Hogares
router.post('/', hogarController.crearHogar);
router.get('/', hogarController.obtenerHogares);
router.get('/:id', hogarController.obtenerHogarPorId);
router.put('/:id', hogarController.actualizarHogar);
router.delete('/:id', hogarController.eliminarHogar);

module.exports = router;