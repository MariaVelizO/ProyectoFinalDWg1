const express = require('express')
const router = express.Router()
const { checkRole } = require('../middleware/auth');
// importar los metodos 
const {getAllEspacios, addEspacios, getEspaciosPorDisponibilidad, updateEspacio, deleteEspacio, getAllReserva} = require('../controllers/administrador.controller')

//definir rutas  y métodos de acción

// imprime todos los espacios
router.get('/Espacios', checkRole(['admin']), getAllEspacios);
//crea un espacio
router.post('/Espacio', checkRole(['admin']), addEspacios);
// imprime los espacios por estado para ver disponibilidad
router.get('/EspacioDisponible/:estado', checkRole(['admin']), getEspaciosPorDisponibilidad);
//actualiza los espacios
router.put('/updateEspacio/:id', checkRole(['admin']), updateEspacio);
//elimina los espacio
router.delete('/deleteEspacio/:id', checkRole(['admin']), deleteEspacio);
//imprimir reservas 
router.get('/reservas', checkRole(['admin']), getAllReserva);

module.exports = router;
