require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const mariadb = require("mariadb");

const connectionString = process.env.DATABASE_URL.replace("mysql://", "mariadb://");
const pool = mariadb.createPool(connectionString);
const adapter = new PrismaMariaDb(pool);

const prisma = new PrismaClient({ adapter });

module.exports = { prisma };