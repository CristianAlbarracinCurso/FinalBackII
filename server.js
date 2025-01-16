import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRouter.js";
import productRouter from "./src/routes/productRouter.js";
import cartRoutes from "./src/routes/cartRouter.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import passport from "passport";
import MongoStore from "connect-mongo";
import "dotenv/config";
import "./src/passport/jwt.js";
import cors from "cors";

const app = express();

const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    crypto: { secret: process.env.JWT_SECRET },
    ttl: 180,
  }),
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};

// Configurar CORS para permitir solicitudes desde el frontend en localhost:5173
const corsOptions = {
  origin: "http://localhost:5173", // Especifica el origen desde el que se permite la solicitud
  methods: "GET,POST", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Encabezados permitidos
  credentials: true, // Habilitar el envío de credenciales como cookies
};

app.use(cors(corsOptions)); // Aplicar configuración de CORS en todo el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/api/carts", cartRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
