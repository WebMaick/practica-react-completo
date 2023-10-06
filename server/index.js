import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { conectDB } from './DB/config.js'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
dotenv.config()

// Iniciando express
const app = express()

// Deshabilitamos cabeceras
app.disable('x-powered-by')

// coneccion a la BD
conectDB()

// CORS
app.use(cors())

// APP json
app.use(express.json())

// Directorio Publico
app.use(express.static('public'))

// rutas
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

const port = process.env.PORT ?? 1234
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
