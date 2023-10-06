import { response } from "express";
import { verify } from "jsonwebtoken";

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No hay token en la peticion",
    });
  }

  try {
    const { id, fullname } = verify(token, process.env.SECRET_JWT_WEBMAICK);

    req.id = id;
    req.fullname = fullname;
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
      message: "Token no Valido",
    });
  }

  next();
};

export { validarJWT };
