const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // paquete para encriptar contraseñas 
const {registroUser, Login, contrasenaOlvidada, restablecerContrasena, putUserRole, getEspaciosDisponibles, crearReserva, reservaPorUsuario, modifReserva, cancelarReserva, agregarComentario} = require('../controllers/usuario.controller');
const { checkRole } = require('../middleware/auth');

//definir rutas  y métodos de acción




































module.exports = router;

