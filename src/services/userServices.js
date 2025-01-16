import { createHash, isValidPassword } from "../../utils.js";
import Services from "./serviceManager.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import factory from "../daos/factory.js";
const { userDao } = factory;

class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken = (user) => {
    const payload = {
      _id: user._id, 
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40m" });
  };

  getUserByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (user) => {
    try {
      const { email, password, isGithub } = user;
      const existUser = await this.getUserByEmail(email);
      if (existUser) throw new Error("El Mail ya se encuentra registrado");
      if (isGithub) {
        const newUser = await this.dao.register(user);
        return newUser;
      }
      // const cart = cartService.create()
      const newUser = await this.dao.register({
        ...user,
        password: createHash(password),
        // cart: cart._id
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await this.getUserByEmail(email);
      if (!userExist) throw new Error("No se Encuentra el Mail en la base de datos");
      const passValid = isValidPassword(password, userExist);
      if (!passValid) throw new Error("Error en Usuario o contraseña");
      return this.generateToken(userExist);
    } catch (error) {
      throw error;
    }
  };
}

export const userService = new UserService();
