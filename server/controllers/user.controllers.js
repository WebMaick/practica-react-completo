import { response } from "express";
import User from "../models/auth.models.js";

const updateUser = async (req, res = response) => {
  const userId = req.params.id;

  try {
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "No existe usuario con el ID proporcionado",
      });
    }

    // Verificamos si es el mismo ID
    if (req.id !== userId) {
      return res.status(401).json({
        ok: false,
        message: "No puedes actualizar esta cuenta!!!",
      });
    }

    console.log(req.body);

    const newUser = {
      ...req.body,
    };

    const newUserUpdate = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      message: "Usuario Actualizado",
      id: newUserUpdate.id,
      fullname: newUserUpdate.fullname,
      email: newUserUpdate.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el admnistrador de sistemas",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const idUser = req.params.id;

  try {
    const usuario = await User.findById(idUser);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "No existe usuario con el ID proporcionado",
      });
    }

    // Verificamos si es el mismo ID

    if (req.id !== idUser) {
      return res.status(401).json({
        ok: false,
        message: "No puedes eliminar esta cuenta!!!",
      });
    }

    await User.findByIdAndDelete(idUser);

    res.clearCookie("access_token");

    res.status(200).json({
      ok: true,
      message: "Usuario Eliminado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

export { updateUser, deleteUser };
