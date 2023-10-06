import pkg from 'jsonwebtoken';
const { sign } = pkg;


const generarJWT = (id, fullname) => {
  return new Promise((resolve, reject) => {
    const payload = { id, fullname };

    sign(
      payload,
      process.env.SECRET_JWT_WEBMAICK,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

export {
  generarJWT,
};
