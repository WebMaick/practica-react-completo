import { Router } from "express";
import { signin, signup } from "../controllers/auth.controllers.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();

router.post("/signin", signin);

// Registro de Usuario
router.post(
  "/signup",
  [
    // midelwares
    check("fullname", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El passwor debe contener al menos 5 caracteres"
    ).isLength({ min: 5 }),
    validarCampos,
  ],
  signup
);

// Inicar sesion SignIn
router.post(
  "/signin",
  [
    // midelwares
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El passwor debe contener al menos 5 caracteres"
    ).isLength({ min: 5 }),
    validarCampos,
  ],
  signin
);

export default router;
