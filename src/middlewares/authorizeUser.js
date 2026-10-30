
const authorizeUser = (req, res, next) => {
  const requestedUserId = Number(req.params.id);
  const authenticatedUserId = Number(req.user.id);

  if (
    requestedUserId !== authenticatedUserId &&
    req.user.role !== "ADMIN"
  ) {
    return res.status(403).json({
      error: "No tienes permiso para consultar este historial"
    });
  }

  next();
};

module.exports = authorizeUser;
