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
router.post('/olvidoContrasena', contrasenaOlvidada); 
//restablecimiento de la contrasena
router.post('/resetContrasena', restablecerContrasena); 
// Rutas para manejo de roles
router.put('/userRol', putUserRole); 
// Rutas para Espacios
router.get('/espaciosDisponibles', getEspaciosDisponibles); 
//crear una reserva
router.post('/crearReserva', crearReserva);
//obtener las reservas por usuario
router.get('/reservas/usuario/:id', reservaPorUsuario); 
//modificar reserva por usuario
router.put('/modificarReserva/:id', modifReserva); 
//cancelar reserva por usuario
router.put('/cancelarReserva/:id', cancelarReserva); 
// Rutas para Comentarios
router.post('/comentario', gregarComentario); 

module.exports = router;

