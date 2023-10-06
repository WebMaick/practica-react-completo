import { response } from 'express'
import User from '../models/auth.models.js'
import bcrypt from "bcryptjs"
import { generarJWT } from "../helpers/jwt.js"

const signin = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    message: 'Hola desde auth',
  })
}
const signup = async (req, res = response) => {
  const { email, password} = req.body
  
  try {
    let usuario = await User.findOne({email})
    
    if(usuario){
      return res.status(401).json({
        ok:false,
        message: "El email ya esta registrado"
      })
    }
    // Creacion de nuevo Usuario Model
    usuario = new User(req.body)

    // Encriptacion de password
    const salt = bcrypt.genSaltSync(10)
    usuario.password = bcrypt.hashSync(password, salt)

    // guardamos a la base de datos
    const newUser = await usuario.save()

    // Genera nuevo token 
    const token = await generarJWT(newUser._id, newUser.fullname)    

    res.status(401).json({
      ok:true,
      message: "Su regitro fue exitoso",
      newUser,
      token
    })
    
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador de sistemas",
    });
  }
}

export { signin, signup }
