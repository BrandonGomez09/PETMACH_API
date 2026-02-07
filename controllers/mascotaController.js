const Mascota = require('../models/Mascota');

exports.crearMascota = async (req, res) => {
    try {
        const nuevaMascota = await Mascota.create(req.body);
        res.status(201).json(nuevaMascota);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al crear la mascota');
    }
};

exports.obtenerMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.findAll();
        res.json(mascotas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener las mascotas');
    }
};


exports.obtenerMascotaPorId = async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.id);
        if (!mascota) {
            return res.status(404).json({ msg: 'Mascota no encontrada' });
        }
        res.json(mascota);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};


exports.actualizarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const { hogarId, ...otrosDatos } = req.body;

        const mascota = await Mascota.findByPk(id);
        if (!mascota) {
            return res.status(404).json({ msg: 'Mascota no encontrada' });
        }

        const datosActualizar = { ...otrosDatos };

        // Si se asigna un hogar
        if (hogarId) {
            const Hogar = require('../models/Hogar');
            const hogar = await Hogar.findByPk(hogarId);

            if (hogar) {
                // Validar capacidad
                if (hogar.ocupacionActual >= hogar.capacidad) {
                    return res.status(400).json({ msg: 'El hogar ha alcanzado su capacidad máxima' });
                }

                // Actualizar contador del hogar
                await hogar.increment('ocupacionActual');

                // Actualizar estado de la mascota
                datosActualizar.hogarId = hogarId;
                datosActualizar.estado = 'En acogida';
            } else {
                return res.status(400).json({ msg: 'Hogar no encontrado' });
            }
        }
        // Si se desasigna
        else if (hogarId === null || hogarId === "") {
            if (mascota.hogarId) {
                const Hogar = require('../models/Hogar');
                const hogarAnterior = await Hogar.findByPk(mascota.hogarId);
                if (hogarAnterior) {
                    await hogarAnterior.decrement('ocupacionActual');
                }
            }
            datosActualizar.hogarId = null;
            datosActualizar.estado = 'Sin hogar';
        }

        await mascota.update(datosActualizar);
        res.json(mascota);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar');
    }
};


exports.eliminarMascota = async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.id);
        if (!mascota) {
            return res.status(404).json({ msg: 'Mascota no encontrada' });
        }

        await mascota.destroy();
        res.json({ msg: 'Mascota eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al eliminar');
    }

};

exports.obtenerMascotasPorHogar = async (req, res) => {
    try {
        const { idHogar } = req.params;
        const mascotas = await Mascota.findAll({ where: { hogarId: idHogar } });
        res.json(mascotas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar mascotas del hogar');
    }
};