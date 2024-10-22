require('dotenv').config(); // Cargar las variables de entorno

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3001
const usuarioRoutes = require('./routes/usuario.routes'); //importación de rutas a emplear

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Permite solicitudes solo desde este origen
    methods: ['GET'], // Solo permite el método GET
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permite el envío de cookies
    maxAge: 3600, // Tiempo máximo de vida de las solicitudes preflight (en segundos)
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

//rutas de api
app.use('/api',  coworkingRoutes);
app.use('/api/usuario', usuarioRoutes);//rutas para usuarios

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () =>{
    console.log('El servidor está listo')
});

mongoose.connect('mongodb://127.0.0.1:27017/coworkingproject').then(()=>{
    console.log('La conexión a la base de datos a sido exitosa');
}).catch((err)=>{
    console.log("Ocurri+o un error, no se pudo conectar a la base de datos");
    console.log(err);
});

