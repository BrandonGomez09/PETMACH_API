const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, telefono, rol } = req.body;

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            password: passwordHash,
            telefono,
            rol: rol || 'voluntario'
        });

        const payload = {
            usuario: { id: nuevoUsuario.id }
        };

        jwt.sign(payload, 'secreto_super_seguro', { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token, rol: nuevoUsuario.rol, nombre: nuevoUsuario.nombre });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error en el servidor');
    }
};

exports.autenticarUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const payload = {
            usuario: { id: usuario.id }
        };

        jwt.sign(payload, 'secreto_super_seguro', { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token, rol: usuario.rol, nombre: usuario.nombre });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};