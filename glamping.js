// glamping.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];  // Obtener el token desde los headers

    if (!token) {
        return res.status(403).send('Se requiere un token de autorización');
    }

    // Eliminar "Bearer " del token
    const tokenWithoutBearer = token.split(' ')[1];  

    jwt.verify(tokenWithoutBearer, 'secreta', (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido');
        }

        req.user = decoded;  // Almacenar la información decodificada del token (como iduser)
        next();
    });
}

module.exports = verifyToken;
