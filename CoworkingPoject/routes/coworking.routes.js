const express = require('express')
const router = express.Router()
// importar los metodos 
const {getAllUsuarios, addUsuario, getUsuarioPorID, updateUser, deleteUser, putUserRole} = require('../controllers/usuario.controller')
const {checkRole} = require('../middleware/aouth');

//definir rutas  y métodos de acción
//mostrar todos los usuarios de la aplicacion
router.get('/usuarios', checkRole ('admin'), getAllUsuarios);
//Creacion de usuarios
router.post('/usuarios', addUsuario);
//Buscar un usuario especifico 
router.get('/usuarios/:id', getUsuarioPorID);
//Actualizar un usuario
router.put('/updateUser/:id', updateUser);
//Borrar Usuario
router.delete('/deleteUser/:id', deleteUser);
//para cambiar si es admin o user
router.put('/usuarioRol/:id', putUserRole)


module.exports = router;