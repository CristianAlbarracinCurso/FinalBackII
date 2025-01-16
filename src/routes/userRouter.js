import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { passportCall } from "../passport/passportCall.js";
import { userAuth } from "../middlewares/userAuth.js";
import passport from "passport";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/current", authenticateToken, (req, res) => {
  const user = req.user; // Los datos del usuario decodificados del token
  if (!user) return res.status(401).json({ message: "Usuario no autorizado" });
  res.json({ user });
});

router.get("/private-headers", passportCall("jwt"), userController.privateData);

router.get(
  "/private-cookies",
  [passportCall("jwtCookies"), userAuth("user")],
  userController.privateData
);

router.get(
  "/private-cookies-admin",
  [passportCall("jwtCookies"), userAuth("admin")],
  userController.privateData
);

export default router;
