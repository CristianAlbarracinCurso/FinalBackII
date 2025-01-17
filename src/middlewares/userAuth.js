export const userAuth = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuario no autenticado." });
      }
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ error: "Acceso denegado. Permisos insuficientes." });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: "Error en la autorización.", details: err.message });
    }
  };
};

