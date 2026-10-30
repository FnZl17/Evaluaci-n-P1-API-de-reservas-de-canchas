const { Router } = require("express");

const authenticateToken = require("../middlewares/auth");
const authorizeBooking = require("../middlewares/authorizeBooking");

const bookingController = require("../controllers/bookingController");

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Crear una reserva
router.post("/", bookingController.createBooking);

// Consultar una reserva
router.get(
  "/:id",
  authorizeBooking,
  bookingController.getBookingById
);

// Actualizar una reserva
router.put(
  "/:id",
  authorizeBooking,
  bookingController.updateBooking
);

// Eliminar una reserva
router.delete(
  "/:id",
  authorizeBooking,
  bookingController.deleteBooking
);

module.exports = router;