import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { passportCall } from "../passport/passportCall.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/current", passportCall("jwtCookies"), (req, res) => {
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


// Rutas para administración de productos (solo "admin")
router.post("/products", passportCall, userAuth(["admin"]), (req, res) => {
  res.status(201).json({ message: "Producto creado correctamente." });
});

router.put("/products/:id", passportCall, userAuth(["admin"]), (req, res) => {
  res.status(200).json({ message: "Producto actualizado correctamente." });
});

router.delete("/products/:id", passportCall, userAuth(["admin"]), (req, res) => {
  res.status(200).json({ message: "Producto eliminado correctamente." });
});

// Rutas para carritos (solo "user")
router.post("/cart", passportCall, userAuth(["user"]), (req, res) => {
  res.status(200).json({ message: "Producto agregado al carrito." });

}
)

export default router;
