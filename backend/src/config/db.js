import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

let prisma = null;
let isDbConnected = false;
let lastCheckTime = 0;

try {
  prisma = new PrismaClient({
    log: ['error']
  });
} catch (err) {
  console.warn('Prisma Client initialization warning:', err.message);
}

/**
 * Check if the Prisma database connection is active with quick caching
 */
export const checkDatabaseConnection = async () => {
  if (!prisma) return false;
  
  const now = Date.now();
  // Cache check for 10 seconds to eliminate TCP connection timeout delays in dev
  if (now - lastCheckTime < 10000) {
    return isDbConnected;
  }

  lastCheckTime = now;
  try {
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 1000));
    await Promise.race([prisma.$queryRaw`SELECT 1`, timeoutPromise]);
    isDbConnected = true;
    return true;
  } catch (err) {
    isDbConnected = false;
    return false;
  }
};

export default prisma;
