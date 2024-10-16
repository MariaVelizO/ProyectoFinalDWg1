const express = require('express')
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


