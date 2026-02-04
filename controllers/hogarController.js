const Hogar = require('../models/Hogar');

exports.crearHogar = async (req, res) => {
    try {
        const nuevoHogar = await Hogar.create(req.body);
        res.status(201).json(nuevoHogar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el hogar');
    }
};

exports.obtenerHogares = async (req, res) => {
    try {
        const hogares = await Hogar.findAll();
        res.json(hogares);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los hogares');
    }
};

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

exports.actualizarHogar = async (req, res) => {
    try {
        const hogar = await Hogar.findByPk(req.params.id);
        if (!hogar) {
            return res.status(404).json({ msg: 'Hogar no encontrado' });
        }
        await hogar.update(req.body);
        res.json(hogar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar');
    }
};

exports.eliminarHogar = async (req, res) => {
    try {
        const hogar = await Hogar.findByPk(req.params.id);
        if (!hogar) {
            return res.status(404).json({ msg: 'Hogar no encontrado' });
        }
        await hogar.destroy();
        res.json({ msg: 'Hogar eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar');
    }
};