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
    telefono: {
        type: Number,
        validate: {
            validator: (v) => /^[0-9]{8}$/.test(v), // Valida un número de 8 dígitos
            message: (props) => `${props.value} no es un número de teléfono válido`
        }
    },
    email: {
            type: String,
            required: true,
            unique: true, // Garantiza que no se repita
            lowercase: true, // Almacena siempre en minúsculas
            match: [/\S+@\S+\.\S+/, 'Correo electrónico no válido']
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Requiere al menos 6 caracteres
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