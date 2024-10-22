const express = require('express')
const router = express.Router()
// importar los metodos 
const {getAllEspacios, addEspacios, getEspaciosPorDisponibilidad, updateEspacio, deleteEspacio, getAllReserva} = require('../controllers/administrador.controller')

//definir rutas  y métodos de acción

// imprime todos los espacios
router.get('/Espacios', getAllEspacios);
//crea un espacio
router.post('/Espacio', addEspacios);
// imprime los espacios por estado para ver disponibilidad
router.get('/EspacioDisponible', getEspaciosPorDisponibilidad);
//actualiza los espacios
router.put('/updateEspacio', updateEspacio);
//elimina los espacio
router.delete('/deleteEspacio', deleteEspacio);
//imprimir reservas 
router.get('/reservas', getAllReserva);

module.exports = router;
