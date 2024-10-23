const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // paquete para encriptar contraseñas 
const {registroUser,Login,contrasenaOlvidada,restablecerContrasena, putUserRole, getEspaciosDisponibles, crearReserva, reservaPorUsuario, modifReserva, cancelarReserva, agregarComentario} = require('../controllers/usuario.controller');
const { checkRole } = require('../middleware/auth');

//definir rutas  y métodos de acción

// registro del usuario
router.post('/registroUsuario', registroUser );
// inicio de sesion 
router.post('/login', Login ); 
// Ruta para recuperación de contraseña
router.post('/olvidoContrasena', checkRole(['admin', 'user']), contrasenaOlvidada); 
//restablecimiento de la contrasena
router.post('/resetContrasena', checkRole(['admin', 'user']), restablecerContrasena); 
// Rutas para manejo de roles
//router.put('/userRol', putUserRole); 
// Rutas para Espacios
router.get('/espaciosDisponibles', checkRole(['user']), getEspaciosDisponibles); 
//crear una reserva
router.post('/crearReserva', checkRole(['user']), crearReserva);
//obtener las reservas por usuario
router.get('/reservas/usuario/:id', checkRole(['user']), reservaPorUsuario); 
//modificar reserva por usuario
router.put('/modificarReserva/:id', checkRole(['user']), modifReserva); 
//cancelar reserva por usuario
router.put('/cancelarReserva/:id', checkRole(['user']), cancelarReserva); 
// Rutas para Comentarios
router.post('/comentario', checkRole(['user']), agregarComentario); 

module.exports = router;

