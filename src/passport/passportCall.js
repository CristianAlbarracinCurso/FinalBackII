import passport from "passport";

/**
 * Middleware para autenticar estrategias de Passport y verificar roles.
 * 
 * @param {string} strategy - Estrategia de Passport a utilizar.
 * @param {Array<string>} [roles] - Lista de roles permitidos (opcional).
 */
export const passportCall = (strategy, roles = []) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          error: "Error interno durante la autenticación.",
          details: err.message,
        });
      }
      if (!user) {
        return res.status(401).json({
          error: "No autenticado.",
          details: info?.message || info?.toString() || "Usuario no encontrado.",
        });
      }

      req.user = user;

      // Si hay roles definidos, verificamos el rol del usuario
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({
          error: "Acceso denegado. Permisos insuficientes.",
        });
      }

      next();
    })(req, res, next);
  };
};
