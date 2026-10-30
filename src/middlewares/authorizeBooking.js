const bookingService = require("../services/bookingServices");

const authorizeBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);

    // Comprobar si existe la reserva
    if (!booking) {
      return res.status(404).json({
        error: "Reserva no encontrada"
      });
    }

    // Comprobar si es el dueño o administrador
    if (
      booking.userId !== req.user.id &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({
        error: "No tienes permiso para acceder a esta reserva"
      });
    }

    // Guardar la reserva para utilizarla en el controlador
    req.booking = booking;

    next();
  } catch (error) {
    return res.status(500).json({
      error: "Error al autorizar la reserva"
    });
  }
};

module.exports = authorizeBooking;