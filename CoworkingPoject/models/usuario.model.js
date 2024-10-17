//importacion de mongoose
const mongoose = require('mongoose')

//esquema de usuario
const UsuarioEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required:true
    },
    apellido: {
        type: String,
        required:true
    },
    telefono: Number,
    email: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
});

//exportacion del modelo usuario
model.exports = mongoose.model('usuario', UsuarioEsquema);