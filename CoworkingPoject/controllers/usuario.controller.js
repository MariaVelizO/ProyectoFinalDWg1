const Usuario = require('../models/usuario.model');

//obtener vista de todos los usuarios con FUNCION ASINCRONA
exports.getAllUsuarios = async(req, res) => {
    const Usuarios = await Usuario.find(); //await espera a obtener la respuesta de la BD
    res.status(200).json(Usuarios); // 200 op termino bien
};

exports.addUsuario = async(req, res) => {  //asyn hay que esperar para continuar
    //console.log(req)
    const nuevoUsuario = await Usuario.create(req.body); //await espera a obtener la respuesta de la BD
    res.status(201).json(nuevoUsuario); // 201 se ha creado un objeto
};

exports.getUsuarioPorID = async(req, res) => {  //asyn hay que esperar para continuar
    const idUsuario = req.params.id;//await espera a obtener la respuesta de la BD

    const usuario = await Usuario.findById(idUsuario);

    if(!usuario){
        //fallido
        return res.status(404).send({ mensaje: 'Usuario no encontrado'});
    }
    res.status(200).json(usuario);
};

exports.updateUser = async(req, res) => {  
    //console.log(req)
    const idUsuario =  req.params.id;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(idUsuario, req.body, {new: true, runValidators: true});//nuevo usuario

    if(!usuarioActualizado){
        return res.status(404).send({mensaje: 'Usuario no Encontrado'});
    }

    res.status(200).json(usuarioActualizado); // 201 se ha creado un objeto
};

exports.deleteUser = async(req, res) => {  
    const idUsuario = req.params.id;

    const usuario = await Usuario.findByIdAndDelete(idUsuario);

    if(!usuario){
        //fallido
        return res.status(404).send({ mensaje: 'Usuario no encontrado'});
    }
    res.status(200).json(usuario);
};


