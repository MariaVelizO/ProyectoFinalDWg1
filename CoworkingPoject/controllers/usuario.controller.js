require('dotenv').config(); // Cargar las variables de entorno para el archivo .env

const Usuario = require('../models/usuario.model');
const Espacio = require('../models/espacios.model');
const Reserva = require('../models/reserva.model');
const Comentario = require('../models/comentarios.model'); 
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // obtencion de la clave secreta de las variables de entorno

const crypto = require('crypto'); // Generar tokens aleatorios
const nodemailer = require('nodemailer'); // Enviar correos electrónicos

//FUNCIONES
//resgistro del usuario 
exports.registroUser = async (req, res) => {
    try {
        const { nombre, apellido, telefono, email, password, role } = req.body;

        //Verificar si ya existe el usuario registrado con el mismo correo
        const usuarioExiste = await Usuario.findOne({email});
        if (usuarioExiste){
            return res.status(400).json({mensaje: 'El usuario ya existe'})
        }

        //Encriptar la contrasena
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            telefono,
            email,
            password: hashedPassword,
            role
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado con exito'});
    } catch (error){
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error});
    }
};

//inicio de sesion 
exports.Login = async (req, res) => {
    const{ email, password } = req.body;

    try {
    //Busqueda de usuario por correo
    const user = await Usuario.findOne({email}); //devuelve un unico usuario/el mas proximo aunque existan 3 similares

    //cuando no coincide el correo
    if(!user) return res.status(400).send('Correo inválido'); 
    //cuando la contraseña no es correcta, compara la ingresada con la almacenada
    const isMatch  = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).send('Contraseña inválida');

    //generar token 
    const token = jwt.sign({ id: user.id, role: user.role}, JWT_SECRET, { expiresIn: '1y'});

    res.send(token);
    }catch (error) {
        console.error(error);
        return res.status(500).send('Error del servidor');
    }
};

// recuperación de contraseña
exports.contrasenaOlvidada = async (req, res) => {
    try {
        const { email } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).send('Usuario no encontrado');
        }

        // Generar token para recuperación de contraseña
        const tokenRecuperacion = crypto.randomBytes(32).toString('hex'); // Generar un buffer de 32 bytes de datos aleatorios
        usuario.resetPasswordToken = tokenRecuperacion; // Asigna el token generado
        usuario.resetPasswordExpire = Date.now() + 3600000; // Tiempo de expiración del token generado
        await usuario.save(); // Guarda el token y su tiempo de expiración

        // Configurar transporte para enviar email
        const transporter = nodemailer.createTransport({ 
            service: 'Gmail', // Define Gmail como servicio de correo electrónico
            auth: {
                user: process.env.EMAIL_USER, // Dirección que se empleará para el envío de correos 
                pass: process.env.EMAIL_PASS // Contraseña de aplicación de mi correo
            }
        });

        // Enviar email con el enlace de recuperación
        const mailOptions = {
            to: usuario.email,
            subject: 'Recuperación de contraseña',
            text: `Haga clic en el siguiente enlace para restablecer su contraseña: 
            http://localhost:3001/reset-password/${tokenRecuperacion}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ mensaje: 'Correo enviado con éxito' });
    } catch (error) {
        console.error(error); // Añadir consola para depuración
        res.status(500).json({ mensaje: 'Error al enviar correo', error });
    }
};

// restablecimiento de la contrasena
exports.restablecerContrasena = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Buscar usuario por token y verificar si no ha expirado
        const user = await Usuario.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ mensaje: 'Token inválido o expirado' });
        }

        // Encriptar la nueva contraseña y actualizarla
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ mensaje: 'Contraseña restablecida con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al restablecer contraseña', error });
    }
};

//roles usuarios
exports.putUserRole = async(req, res) => {         
    const{role} = req.body; // del body capturamos un parametro

    try{
        const user = await Usuario.findByIdAndUpdate(req.params.id, {role}, {new:true});

        if(!user) return res.status(404).send('Usuario no encontrado.');

        res.status(200).json(user); //si el usuario se encuentra manda el parametro
    }catch{
        res.status(500).json('Algo salió mal');
    }
}

//visualización de espacios disponibles (solo los que están activos) segun ciertas especificaciones del usuario
exports.getEspaciosDisponibles = async (req, res) => {
    try {
        // Obtener solo los espacios con estado activo
        const { tipo, capacidad, ubicacion, disponibilidad } = req.query;

        // Crear objeto de filtro dinámico
        let busquedaFiltros = { estado: 'activo' };

        if (tipo) {
            busquedaFiltros.tipo = tipo;
        }

        if (capacidad) {
            busquedaFiltros.capacidad = { $gte: capacidad }; // Capacidad mayor o igual al valor
        }

        if (ubicacion) {
            busquedaFiltros.ubicacion = ubicacion;
        }

        if (disponibilidad) {
            busquedaFiltros.disponibilidad = disponibilidad; 
        }

        // Buscar espacios según los filtros
        const espacios = await Espacio.find(busquedaFiltros);

        if (espacios.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron espacios con los filtros especificados' });
        }

        res.status(200).json(espacios);
    } catch (error) {
        console.error("Error al obtener los espacios:", error);
        res.status(500).send({ mensaje: 'Error en el servidor' });
    }
};

// crear reserva de un espacio de trabajo
exports.crearReserva = async (req, res) => {
    try {
        const { espacioId, usuarioId, fechaReserva, horaInicio, horaFin, usuarioEmail } = req.body;

        // Verificar si el espacio existe y está activo
        const espacio = await Espacio.findById(espacioId);
        if (!espacio) {
            return res.status(404).json({ mensaje: 'Espacio no encontrado' });
        }

        if (espacio.estado !== 'activo') {
            return res.status(400).json({ mensaje: 'El espacio no está disponible para reservas' });
        }

        // Verificar si el usuario existe
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Crear una nueva reserva
        const nuevaReserva = new Reserva({
            usuario: usuarioId,
            espacio: espacioId,
            fechaReserva,
            horaInicio,
            horaFin,
            estado: 'activo' //tomamos en cuenta unicamente espacios activos
        });

        // Guardar la reserva en la base de datos
        await nuevaReserva.save();

        // Respuesta exitosa con detalles de la reserva notificaacion interna
        res.status(201).json({
            mensaje: 'Reserva creada exitosamente',
            reserva: nuevaReserva
        });

        // Enviar correo de confirmación al usuario, notificacion externa
        correoConfirmacion(usuarioEmail, nuevaReserva);

    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

// envio de notificación por correo
const correoConfirmacion = async (usuarioEmail, reserva) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // Dirección de correo
            pass: process.env.EMAIL_PASS   // Contraseña de la aplicación
        }
    });

    const mailOptions = {
        to: usuarioEmail,
        subject: 'Confirmación de Reserva de Espacio de Trabajo',
        text: `Su reserva ha sido confirmada. Aquí están los detalles de la reserva:

Espacio reservado: ${reserva.espacio}
Fecha de reserva: ${reserva.fechaReserva}
Hora de inicio: ${reserva.horaInicio}
Hora de fin: ${reserva.horaFin}

Gracias por utilizar nuestro servicio.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado exitosamente a:', usuarioEmail);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

//obtener todas las reservas 
exports.reservaPorUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.id; // Obtiene el ID del usuario

        // Buscar todas las reservas asociadas al usuario
        const reservas = await Reserva.find({ usuario: usuarioId });

        if (reservas.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron reservas para este usuario' });
        }

        // Devuelve las reservas encontradas sin información del espacio
        res.status(200).json(reservas); 
    } catch (error) {
        console.error('Error al obtener reservas:', error.message);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

//modificacion de reserva
exports.modifReserva = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la reserva de los parámetros
    const nuevosDatos = req.body; // Obtiene los nuevos datos desde el cuerpo de la solicitud

    try {
        // Buscar y actualizar la reserva
        const reservaActualizada = await Reserva.findByIdAndUpdate(id, nuevosDatos, { new: true, runValidators: true });

        // Verifica si la reserva fue encontrada y actualizada
        if (!reservaActualizada) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }

        res.status(200).json(reservaActualizada); // Devuelve la reserva actualizada
    } catch (error) {
        console.error('Error al modificar la reserva:', error.message);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

//eliminacion/cancelacion de reserva
exports.cancelarReserva = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la reserva 

    try {
        // Buscar y eliminar la reserva
        const reservaCancelada = await Reserva.findByIdAndUpdate(
            id,
            { estado: 'inactivo' }, // Actualiza el estado a 'inactivo' en lugar de eliminar (eliminado logico)
            { new: true } // Devuelve la reserva actualizada
        );

        // Verifica si la reserva fue encontrada y cancelada
        if (!reservaCancelada) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }

        res.status(200).json({ mensaje: 'Reserva cancelada', reserva: reservaCancelada }); // Devuelve la reserva cancelada
    } catch (error) {
        console.error('Error al cancelar la reserva:', error.message);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

//calificaciones y comentarios
exports.agregarComentario = async (req, res) => {
    const { usuarioId, espacioId, valoracion, comentario } = req.body; // Obtiene los datos del esquema de comentarios
    try {
        // Crear un nuevo comentario
        const nuevoComentario = new Comentario({
            usuarioId,
            espacioId,
            valoracion,
            comentario
        });

        // Guardar el comentario 
        await nuevoComentario.save();

        res.status(201).json({ mensaje: 'Comentario agregado con éxito', comentario: nuevoComentario }); // Devuelve el comentario creado
    } catch (error) {
        console.error('Error al agregar el comentario:', error.message);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}; 
