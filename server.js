// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./controllers/MiController');
const verifyToken = require('./glamping');

const app = express();
const port = 3000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.post('/register', authController.register);  // Ruta de registro
app.post('/login', authController.login);        // Ruta de inicio de sesión

// Rutas protegidas (requieren token JWT)
app.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Acceso al perfil permitido',
        user: req.user
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
