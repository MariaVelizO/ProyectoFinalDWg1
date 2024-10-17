//importación de mongoose
const mongoose = require('mongoose')


const EspaciosEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    
    tipo: {
        type: String,
        enum: ['oficina', 'sala de reuniones', 'escritorios'], 
        required: true,
    },

    capacidad: {
        type: Number,
        required: false
    },
    
    ubicacion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    
    disponibilidad: {
        type: Array,
        required: true,
    },

    estado: {
        type: String,
        enum: ['activo', 'inactivo'], 
        required: true,
        default: 'activo',
    }

});

//exportación de los modelos
module.exports = mongoose.model('Espacio', EspaciosEsquema);
