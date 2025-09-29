import { hashPassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/sequelize/user.model.js";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  const hashed = await hashPassword(password);
  try {
    // TODO: crear usuario con password hasheada y profile embebido
    await UserModel.create({
      username,
      email,
      password: hashed,
      role,
      profile,
    });
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    const user = await UserModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "credenciales inválidas",
      });
    }
    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    } else {
      // Generar JWT
      const token = generateToken({
        id: user.id,
        name: user.username,
        role: user.role,
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hora
      });
    }

    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
