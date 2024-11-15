// controllers/MiController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../Mibasededatos');

// Función para registrar un usuario
const register = (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }

        if (results.length > 0) {
            return res.status(400).send('El nombre de usuario ya está registrado');
        }

        // Encriptar la contraseña
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send('Error al registrar el usuario');
            }

            // Insertar nuevo usuario
            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
                if (err) {
                    return res.status(500).send('Error al registrar el usuario');
                }
                res.status(201).send('Usuario registrado con éxito');
            });
        });
    });
};

// Función para iniciar sesión
const login = (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }

        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = results[0];

        // Comparar las contraseñas
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).send('Error al comparar contraseñas');
            }

            if (!match) {
                return res.status(400).send('Contraseña incorrecta');
            }

            // Crear un token JWT
            const token = jwt.sign({ iduser: user.iduser }, 'secreta', { expiresIn: '1h' });

            res.json({
                message: 'Autenticación satisfactoria',
                token: token
            });
        });
    });
};

module.exports = {
    register,
    login
};
