import { response } from "express";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const validarJWT = (req, res = response, next) => {
  //const token = req.header("x-token");
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Revise su sesion - token",
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
