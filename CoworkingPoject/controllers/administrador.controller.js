const Espacio = require('../models/espacios.model');
const Reserva = require('../models/reserva.model');

//ESPACIOS

// imprime todos los espacios
exports.getAllEspacios = async (req, res) =>{
    const Espacios  = await Espacio.find();
    res.status(200).json(Espacios );
};

//crea un espacio
exports.addEspacios = async (req, res) =>{
    console.log(req)
    const nuevoEspacio = await Espacio.create(req.body)
    res.status(201).json(nuevoEspacio);
}


// imprime los espacios por estado para ver disponibilidad
exports.getEspaciosPorDisponibilidad = async (req, res) => {
    try {
        const estado = req.params.estado;  // "activo" o "desactivado"

        // Busca todos los espacios con el estado proporcionado
        const espacios = await Espacio.find({ estado });

        // Verifica si se encontraron espacios
        if (espacios.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron espacios con el estado especificado' });
        }

        // Responde con los espacios encontrados
        res.status(200).json(espacios);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los espacios' });
    }
};


//actualiza los espacios
exports.updateEspacio =  async (req, res) => {
    const idEspacio = req.params.id;

    const espacioActualizado = await Espacio.findByIdAndUpdate(idEspacio, req.body, {new: true, runValidators: true});
    
    if (!espacioActualizado){
        return res.status(404).send({mensaje: 'Espacio no encontrado'});
    }

    res.status(200).json(espacioActualizado);
}

//elimina los espacio
exports.deleteEspacio = async (req, res) =>{
    const idEspacio = req.params.id;

    const espacioEliminado = await Espacio.findByIdAndDelete(idEspacio);
    
    if(!espacioEliminado){
        //fallida
        return res.status(404).send({mensaje: 'Espacio no encontrado'});
    }
     // Espacio eliminado correctamente
     res.status(200).send({ mensaje: 'Espacio eliminado exitosamente' });
    
}

//RESERVA

//imprimir reservas 
exports.getAllReserva = async (req, res) => {
    try {
        // Obtener todas las reservas y poblar los campos 'usuario' y 'espacio'
        const reservas = await Reserva.find()
            .populate('usuario', 'nombre')  // Poblar el campo 'usuario' con 'nombre'
            .populate('espacio', 'nombre'); // Poblar el campo 'espacio' con 'nombre'

        if (reservas.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Reservas obtenidas con éxito',
                data: reservas
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No se encontraron reservas.'
            });
        }
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las reservas',
            error: error.message
        });
    }
};