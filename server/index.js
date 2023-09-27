const express = require('express')
const { connecionDB } = require('./DB/config')
require('dotenv').config()

// Iniciando express
const app = express()

// coneccion a la BD
connecionDB()

app.get('/', (req, res) => res.send('Hola Maicl'))
const port = process.env.PORT ?? 1234
app.listen(port, () =>
  console.log(`El ervidor esta corriendo en el PUERTO: ${port}`)
)
