const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const bookingsRouter = require("./bookings");
const userRouter = require("./user");

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/bookings", bookingsRouter);
router.use("/users", userRouter);
// Monta aquí tus routers de los hitos 2, 3 y 4

module.exports = router;
