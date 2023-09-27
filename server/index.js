const express = require('express')
require('dotenv').config()
const app = express()

app.get('/', (req, res) => res.send('Hola Maicl'))
const port = process.env.PORT ?? 1234
app.listen(port, () =>
  console.log(`El ervidor esta corriendo en el PUERTO: ${port}`)
)
