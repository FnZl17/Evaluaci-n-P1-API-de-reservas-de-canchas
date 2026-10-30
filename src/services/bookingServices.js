const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

// Crear una reserva
const createBooking = async ({ date, scheduleId, userId }) => {
  // Comprobar si el horario ya está ocupado
  const existingBooking = await prisma.booking.findFirst({
    where: {
      date: new Date(date),
      scheduleId: Number(scheduleId)
    }
  });

  if (existingBooking) {
    throw new Error("El horario ya está ocupado");
  }

  return await prisma.booking.create({
    data: {
      date: new Date(date),
      scheduleId: Number(scheduleId),
      userId: Number(userId)
    }
  });
};

// Buscar una reserva por ID
const getBookingById = async (id) => {
  return await prisma.booking.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      schedule: true
    }
  });
};

// Modificar una reserva
const updateBooking = async (id, { date, scheduleId }) => {
  const existingBooking = await prisma.booking.findFirst({
    where: {
      date: new Date(date),
      scheduleId: Number(scheduleId),
      NOT: {
        id: Number(id)
      }
    }
  });

  if (existingBooking) {
    throw new Error("El horario ya está ocupado");
  }

  return await prisma.booking.update({
    where: {
      id: Number(id)
    },
    data: {
      date: new Date(date),
      scheduleId: Number(scheduleId)
    }
  });
};

// Eliminar una reserva
const deleteBooking = async (id) => {
  return await prisma.booking.delete({
    where: {
      id: Number(id)
    }
  });
};

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking
};