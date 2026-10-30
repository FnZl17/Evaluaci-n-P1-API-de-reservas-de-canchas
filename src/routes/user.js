
const { Router } = require("express");

const authenticateToken = require("../middlewares/auth");
const authorizeUser = require("../middlewares/authorizeUser");
const userController = require("../controllers/userController");

const router = Router();

router.use(authenticateToken);

router.get(
  "/:id/bookings",
  authorizeUser,
  userController.getUserBookings
);

module.exports = router;
