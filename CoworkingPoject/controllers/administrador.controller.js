const Espacio = require('../models/espacios.model');
const Reserva = require('../models/reserva.model');

//ESPACIOS

// imprime todos los espacios
exports.getAllEspacios = async (req, res) =>{
    const Espacios  = await Espacios .find();
    res.status(200).json(Espacios );
};

//crea un espacio
exports.addEspacios = async (req, res) =>{
    console.log(req)
    const nuevoEspacio = await Espacio.create(req.body)
    res.status(201).json(nuevoEspacio);
}


// imprime los espacios por estado para ver disponibilidad
exports.getEspaciosPorDisponibilidad = async (req, res) =>{
    const DisponEspacio = req.params.id;

    const espacios = await espacios.findById(DisponEspacio);
    
    if(!espacios){
        //fallida
        return res.status(404).send({mensaje: 'Espacio no encontrado'});
    }

    res.status(200).json(espacios);
}

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

    const Espacio = await Usuario.findByIdAndDelete(idEspacio);
    
    if(!Espacio){
        //fallida
        return res.status(404).send({mensaje: 'Espacio no encontrado'});
    }
     // Espacio eliminado correctamente
     res.status(200).send({ mensaje: 'Espacio eliminado exitosamente' });
    
}

//RESERVA

//imprimir reservas 
exports.getAllReserva = async (req, res) =>{
    const Reserva  = await Reserva .find();
    res.status(200).json(Reserva );
};
