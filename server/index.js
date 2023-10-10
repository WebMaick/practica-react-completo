import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { conectDB } from "./DB/config.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

// Iniciando express
const app = express();

// Deshabilitamos cabeceras
app.disable("x-powered-by");

// coneccion a la BD
conectDB();

// CORS
app.use(cors());

// APP json
app.use(express.json());

// app para parsear las cookies
app.use(cookieParser());

// Directorio Publico
app.use(express.static("public"));

// rutas
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT ?? 1234;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
