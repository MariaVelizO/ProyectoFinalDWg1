const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // paquete para encriptar contraseñas 
// importar los metodos 

const {registroUser, Login, contrasenaOlvidada, restablecerContrasena, putUserRole, getEspaciosDisponibles, crearReserva, reservaPorUsuario, modifReserva, cancelarReserva, agregarComentario} = require('../controllers/usuario.controller');

//importar capa media-validaciones
const { checkRole } = require('../middleware/auth');

//registro de un nuevo usuario
router.post('/registerUser', registroUser);

//inicio de sesion 
router.post('/user-login', Login);

//recuperacion de contrasena 
router.post('/contrasena-olvidada',checkRole(['admin', 'user']), contrasenaOlvidada);

//reestablecimiento de contrasena
router.post('/reestablecer-contrasena', checkRole(['admin', 'user']), restablecerContrasena);

//cambio de rol
router.put('/usuarioRol/:id',putUserRole);

//visualizacion de los espacios de trabajo disponible
router.get('/espacios', checkRole(['user']), getEspaciosDisponibles);

//creacion de reserva de espacios de trabajo 
router.post('/reserva', checkRole(['user']), crearReserva);

//obtener reservas por usuario
router.get('/reservas/usuario/:id', checkRole(['user']), reservaPorUsuario);

//modificar reservas por usuario
router.put('/reserva-modificacion/:id', checkRole(['user']), modifReserva);

//cancelar reservas por usuario
router.put('/reserva-cancelacion/:id', checkRole(['user']),  cancelarReserva);

//crear un comentario
router.post('/comentario-usuario', checkRole(['user']), agregarComentario);

//redireccion luego de logearse


module.exports = router;
































module.exports = router;

