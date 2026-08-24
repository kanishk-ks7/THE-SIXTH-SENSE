import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

let prisma;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  });
} catch (err) {
  console.warn('Prisma Client initialization warning:', err.message);
}

/**
 * Check if the Prisma database connection is active
 */
export const checkDatabaseConnection = async () => {
  if (!prisma) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (err) {
    return false;
  }
};

export default prisma;
