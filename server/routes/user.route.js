import { Router } from "express";
import { updateUser, deleteUser } from "../controllers/user.controllers.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

// validar Token si se tuviera una ruta publica colocar esta linea debajo de la ruta
router.use(validarJWT);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
