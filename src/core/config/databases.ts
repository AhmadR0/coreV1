// src/core/config/databases.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' }); 

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;

// Validasi environment variables
if (!dbName || !dbUser || dbPass === undefined || !dbHost) {
  throw new Error("Missing one or more DB environment variables.");
}

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql',
  logging: console.log, // Ubah ke false untuk production
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true
  }
});

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Optional: sync model dengan database
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
}