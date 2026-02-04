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
                const mascota = await Mascota.findByPk(req.params.id);
                if (!mascota) {
                    return res.status(404).json({ msg: 'Mascota no encontrada' });
                }

                await mascota.update(req.body);
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