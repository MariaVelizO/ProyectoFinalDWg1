//importación de mongoose
const mongoose = require('mongoose')


const ComentariosEsquema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Usuario',  
        required: true
      },
      espacioId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Espacio',  
        required: true
      },
      valoracion: {
        type: Number,  
        required: true,
        min: 1,  
        max: 5  
      },
      comentario: {
        type: String,  
        required: true  
      },
      fechaComentario: {
        type: Date,  
        required: true,
         default: Date.now 
      }
    });

//exportación de los modelos
module.exports = mongoose.model('Comentarios', ComentariosEsquema);