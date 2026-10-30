
const userService = require("../services/userService");

const getUserBookings = async (req, res) => {
  try {
    const bookings = await userService.getUserBookings(req.params.id);

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("ERROR AL CONSULTAR HISTORIAL:", error);

    return res.status(500).json({
      error: "Error al consultar el historial de reservas"
    });
  }
};

module.exports = {
  getUserBookings
};
