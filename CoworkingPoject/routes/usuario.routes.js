const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // paquete para encriptar contraseñas 
const {registroUser,Login,contrasenaOlvidada,restablecerContrasena, putUserRole, getEspaciosDisponibles, crearReserva, reservaPorUsuario, modifReserva, cancelarReserva, agregarComentario} = require('../controllers/usuario.controller');
const { checkRole } = require('../middleware/auth');

//definir rutas  y métodos de acción

// registro del usuario
router.post('/registerUser', registroUser );
// inicio de sesion 
router.post('/user-login', Login ); 
// Ruta para recuperación de contraseña
router.post('/contrasena-olvidada', checkRole(['admin', 'user']), contrasenaOlvidada); 
//restablecimiento de la contrasena
router.post('/reestablecer-contrasena', checkRole(['admin', 'user']), restablecerContrasena); 
// Rutas para manejo de roles
//router.put('/userRol', putUserRole); 
// Rutas para Espacios
router.get('/espacios', checkRole(['user']), getEspaciosDisponibles); 
//crear una reserva
router.post('/reserva', checkRole(['user']), crearReserva);
//obtener las reservas por usuario
router.get('/reservas/usuario/:id', checkRole(['user']), reservaPorUsuario); 
//modificar reserva por usuario
router.put('/reserva-modificacion/:id', checkRole(['user']), modifReserva); 
//cancelar reserva por usuario
router.put('/reserva-cancelacion/:id', checkRole(['user']), cancelarReserva); 
// Rutas para Comentarios
router.post('/comentario-usuario', checkRole(['user']), agregarComentario); 


module.exports = router;

