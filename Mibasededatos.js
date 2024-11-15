// Mibasededatos.js
const mysql = require('mysql');

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Usuario por defecto de XAMPP
    password: '',  // Contraseña por defecto en XAMPP
    database: 'autenticacion_app'  // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = db;
