const { Router } = require("express");
const adminController = require("../controllers/adminController");
const authenticateToken = require("../middlewares/auth");

const router = Router();

// Proteger todas las rutas del administrador
router.use(authenticateToken);

// Crear horarios
router.post("/schedules", (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acceso denegado. Se requiere rol ADMIN"
    });
  }

  next();
}, adminController.createSchedule);

// Consultar todas las reservas
router.get("/bookings", (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acceso denegado. Se requiere rol ADMIN"
    });
  }

  next();
}, adminController.getAllBookings);

module.exports = router;