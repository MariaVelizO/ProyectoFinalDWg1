//importacion de mongoose
const mongoose = require('mongoose')

//esquema de reservas
const ReservaEsquema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',  
        required: true
    },
    espacio: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Espacios',
        required: true
    },
    fechaReserva: {
        type: Date,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFin: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
});

//exportacion del modelo reservas
module.exports = mongoose.model('Reserva', ReservaEsquema);