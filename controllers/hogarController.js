const Hogar = require('../models/Hogar');
const socketManager = require('../socket');

// ─────────────────────────────────────────────
// CREAR
// ─────────────────────────────────────────────
exports.crearHogar = async (req, res) => {
    try {
        const nuevoHogar = await Hogar.create(req.body);

        // 🔔 Emitir evento en tiempo real
        socketManager.getIO().emit('hogar_actualizado', nuevoHogar);

        res.status(201).json(nuevoHogar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el hogar');
    }
};

// ─────────────────────────────────────────────
// OBTENER TODOS
// ─────────────────────────────────────────────
exports.obtenerHogares = async (req, res) => {
    try {
        const hogares = await Hogar.findAll();
        res.json(hogares);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los hogares');
    }
};

// ─────────────────────────────────────────────
// OBTENER POR ID
// ─────────────────────────────────────────────
exports.obtenerHogarPorId = async (req, res) => {
    try {
        const hogar = await Hogar.findByPk(req.params.id);
        if (!hogar) {
            return res.status(404).json({ msg: 'Hogar no encontrado' });
        }
        res.json(hogar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
};

// ─────────────────────────────────────────────
// ACTUALIZAR
// ─────────────────────────────────────────────
exports.actualizarHogar = async (req, res) => {
    try {
        const hogar = await Hogar.findByPk(req.params.id);
        if (!hogar) {
            return res.status(404).json({ msg: 'Hogar no encontrado' });
        }
        await hogar.update(req.body);

        // 🔔 Emitir evento en tiempo real
        socketManager.getIO().emit('hogar_actualizado', hogar);

        res.json(hogar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar');
    }
};

// ─────────────────────────────────────────────
// ELIMINAR
// ─────────────────────────────────────────────
exports.eliminarHogar = async (req, res) => {
    try {
        const { id } = req.params;
        const hogar = await Hogar.findByPk(id);
        if (!hogar) {
            return res.status(404).json({ msg: 'Hogar no encontrado' });
        }
        await hogar.destroy();

        // 🔔 Emitir evento en tiempo real
        socketManager.getIO().emit('hogar_eliminado', { id: Number(id) });

        res.json({ msg: 'Hogar eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar');
    }
};