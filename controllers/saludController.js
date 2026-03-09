const Salud = require('../models/Salud');
const Mascota = require('../models/Mascota');
const socketManager = require('../socket');

// ─────────────────────────────────────────────
// AGREGAR REGISTRO DE SALUD (Solo Admin)
// ─────────────────────────────────────────────
exports.agregarRegistroSalud = async (req, res) => {
    try {
        const { rol, mascotaId, diagnostico, vacuna, fechaTratamiento } = req.body;

        // Verificar que el usuario sea admin
        if (rol !== 'admin') {
            return res.status(403).json({ msg: 'Acceso denegado. Solo administradores pueden agregar registros de salud.' });
        }

        // Validar que la mascota exista
        const mascota = await Mascota.findByPk(mascotaId);
        if (!mascota) {
            return res.status(404).json({ msg: 'Mascota no encontrada' });
        }

        const nuevoRegistro = await Salud.create({
            mascotaId,
            diagnostico,
            vacuna,
            fechaTratamiento
        });

        // 🔔 Emitir evento en tiempo real
        socketManager.getIO().emit('nuevo_registro_salud', nuevoRegistro);

        res.status(201).json(nuevoRegistro);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el registro de salud');
    }
};

// ─────────────────────────────────────────────
// OBTENER HISTORIAL CLÍNICO POR MASCOTA
// ─────────────────────────────────────────────
exports.obtenerHistorialClinico = async (req, res) => {
    try {
        const { mascotaId } = req.params;

        const historial = await Salud.findAll({
            where: { mascotaId },
            order: [['fechaTratamiento', 'DESC']]
        });

        res.json(historial);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el historial clínico');
    }
};
