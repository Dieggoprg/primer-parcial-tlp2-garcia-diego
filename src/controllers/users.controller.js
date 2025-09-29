import { UserModel } from "../models/sequelize/user.model.js";
import { ProfileModel } from "../models/sequelize/profile.model.js";
import { AssetModel } from "../models/sequelize/asset.model"; 

export const getAllUsers = async (_req, res) => {
  try {
    // TODO: devolver usuarios con profile y sus assets con sus categories (populate) (solo admin)
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
        {
          model: AssetModel,
          as: "assets",
        },
      ],
    });

    if (!users) {
      res.status(404).json("Usuarios no encontrados");
    }
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    // TODO: eliminación lógica (deletedAt) (solo admin)
    // verifico si el usuario que hace la petición es administrador
    if (user.role !== "admin") {
      return res.status(403).json({
        msg: "Solo los administradores pueden eliminar usuarios",
      });
    }

    //Encuentro al usuario que quiero eliminar
    const userToDelete = await UserModel.findById(id);

    if (!userToDelete) {
      return res.status(404).json({
        msg: "El ID del usuario no existe.",
      });
    }

    //eliminación lógica
    userToDelete.deletedAt = new Date();
    await userToDelete.save();

    return res.status(200).json({
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
