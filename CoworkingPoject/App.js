const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = 3001
const coworkingRoutes = require('./routes/coworking.routes')

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

