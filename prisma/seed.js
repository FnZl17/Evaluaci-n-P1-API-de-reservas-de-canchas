require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Orden de borrado por las claves foráneas
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const yo = await prisma.user.create({
    data: {
      name: "Nicolas Zurita",
      email: "fnzurita@espe.edu.ec",
      password: await bcrypt.hash("user123", 10),
      role: "USER",
    },
  });

  const futbol2 = await prisma.schedule.create({
    data: {
      court: "Fútbol 2",
      startTime: new Date("2026-11-12T08:00:00Z"),
      endTime: new Date("2026-11-12T10:00:00Z"),
    },
  });

  const padel1 = await prisma.schedule.create({
    data: {
      court: "Pádel 1",
      startTime: new Date("2026-11-12T10:00:00Z"),
      endTime: new Date("2026-11-12T12:00:00Z"),
    },
  });

  await prisma.booking.create({
    data: {
      date: new Date("2026-11-12T00:00:00Z"),
      user: { connect: { id: yo.id } },
      schedule: { connect: { id: futbol2.id } },
    },
  });

  await prisma.booking.create({
    data: {
      date: new Date("2026-11-12T00:00:00Z"),
      user: { connect: { id: admin.id } },
      schedule: { connect: { id: padel1.id } },
    },
  });

  console.log("Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());