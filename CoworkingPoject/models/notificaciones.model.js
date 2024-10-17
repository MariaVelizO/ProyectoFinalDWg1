//importación de mongoose
const mongoose = require('mongoose')

const NotificacionesEsquema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,  
        required: true 
      },
      tipo: {
        type: String,  
        enum: ['reserva_confirmada', 'reserva_cancelada', 'recordatorio_reserva', 'reserva_modificada'], 
        required: true  
      },
      mensaje: {
        type: String,  
        required: true  
      },
      fechaEnvio: {
        type: Date,  
        required: true
      },
      leida: {
        type: Boolean,  
        required: true,
        default: false  
      }
    });


    //exportación de los modelos
module.exports = mongoose.model('Notificaciones', NotificacionesEsquema);