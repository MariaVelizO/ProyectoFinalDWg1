//paquete de json web token
const jwt = require ('jsonwebtoken'); // se envia en el header
//const SECRET_KEY = 'mysecretkey';

require('dotenv').config(); // Cargar las variables de entorno para el archivo .env
const JWT_SECRET = process.env.JWT_SECRET; // obtencion de la clave secreta de las variables de entorno


//funcion que valida el rol de un user
function checkRole(role){
    return function(req, res, next){  //siguiente linea de comunicacion-controladores
        //const token = req.headers['authorization'];
        //const token = req.headers['authorization']?.split(' ')[1]; // Extrae solo el token
        // Extraer el token desde el encabezado 'authorization'
        let token = req.headers['authorization'];

        console.log('Token recibido:', token);
        
        // Si existe, extraer el token después del 'Bearer ' (caso del frontend)
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1]; // Usar solo la parte del token.
        }


        if(!token) return res.status(401).send('Acceso denegado. No TOKEN');

        try{
            const decoded = jwt.verify(token, JWT_SECRET);//enviar token y clave sedcreta para decodifique

            if(decoded.role != role) return res.status(403).send('Acceso denegado.');

            req.user = decoded; //json webtoken decodificado
            next();
        }catch(error) {
            console.error('Error al verificar el token:', error); // Log el error
            res.status(400).send('Petición inválida.');
        }
    }
}

module.exports = {checkRole};