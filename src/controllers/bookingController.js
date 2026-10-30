const bookingService = require("../services/bookingServices");

// POST: Crear una reserva
const createBooking = async (req, res) => {
  try {
    const { date, scheduleId } = req.body;

    const booking = await bookingService.createBooking({
      date,
      scheduleId,
      userId: req.user.id
    });

    return res.status(201).json(booking);
  } catch (error) {
    if (error.message === "El horario ya está ocupado") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Error al crear la reserva" });
  }
};

// GET: Consultar una reserva
const getBookingById = async (req, res) => {
  return res.status(200).json(req.booking);
};

// PUT: Actualizar una reserva
const updateBooking = async (req, res) => {
  try {
    const { date, scheduleId } = req.body;

    const booking = await bookingService.updateBooking(
      req.params.id,
      { date, scheduleId }
    );

    return res.status(200).json(booking);
  } catch (error) {
    if (error.message === "El horario ya está ocupado") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Error al actualizar la reserva" });
  }
};

// DELETE: Eliminar una reserva
const deleteBooking = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking
};