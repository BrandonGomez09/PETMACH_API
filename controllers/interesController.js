const Interes = require('../models/Interes');
const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');
const socketManager = require('../socket');

// ─────────────────────────────────────────────
// CREAR INTERÉS
// ─────────────────────────────────────────────
exports.crearInteres = async (req, res) => {
    try {
        const { usuarioId, mascotaId } = req.body;

        // Validar que el usuario exista
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Validar que la mascota exista
        const mascota = await Mascota.findByPk(mascotaId);
        if (!mascota) {
            return res.status(404).json({ msg: 'Mascota no encontrada' });
        }

        const nuevoInteres = await Interes.create({ usuarioId, mascotaId });

        // 🔔 Emitir evento en tiempo real
        socketManager.getIO().emit('nuevo_interes', nuevoInteres);

        res.status(201).json(nuevoInteres);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el interés');
    }
};

// ─────────────────────────────────────────────
// OBTENER INTERESES POR MASCOTA
// ─────────────────────────────────────────────
exports.obtenerInteresesPorMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const intereses = await Interes.findAll({
            where: { mascotaId: id },
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nombre', 'email', 'telefono']
                }
            ]
        });

        res.json(intereses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los intereses');
    }
};
