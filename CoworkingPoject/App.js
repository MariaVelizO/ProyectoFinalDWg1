const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = 3001
const coworkingRoutes = require('./routes/coworking.routes')

app.use('/api',  coworkingRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () =>{
    console.log('El servidor está listo')
});

mongoose.connect('mongodb://127.0.0.1:27017/coworkingproject').then(()=>{
    console.log('La conexion a la base de datos a sigo exitosa');
}).catch((err)=>{
    console.log("Ocurrio un error, no se pudo conectar a la base de datos");
    console.log(err);
});

