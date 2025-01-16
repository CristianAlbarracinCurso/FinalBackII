export const userAuth = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Usuario no autenticado." });
    if (req.user.role !== role)
      return res.status(403).json({ error: "Acceso denegado. Permisos insuficientes." });
    next();
  };
};
