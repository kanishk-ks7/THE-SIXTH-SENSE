import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import sportRoutes from './routes/sportRoutes.js';
import athleteRoutes from './routes/athleteRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { checkDatabaseConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// -------------------------------------------------------------
// GLOBAL MIDDLEWARE
// -------------------------------------------------------------
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl) or from frontend
    if (!origin || origin === FRONTEND_URL || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// -------------------------------------------------------------
// HEALTH CHECK ENDPOINT
// -------------------------------------------------------------
app.get('/api/health', async (req, res) => {
  const dbConnected = await checkDatabaseConnection();
  res.status(200).json({
    status: 'online',
    application: 'Athletex API',
    version: '1.0.0',
    database: dbConnected ? 'connected' : 'memory-sync-active',
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// API ROUTE MOUNTING
// -------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api', sportRoutes);
app.use('/api/athlete', athleteRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// -------------------------------------------------------------
// 404 & ERROR HANDLING
// -------------------------------------------------------------
app.use(notFoundHandler);
app.use(errorHandler);

// -------------------------------------------------------------
// SERVER BOOTSTRAP
// -------------------------------------------------------------
const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  🚀 ATHLETEX BACKEND SERVER RUNNING ON PORT ${PORT}`);
  console.log(`  🌐 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  📊 Telemetry API: http://localhost:${PORT}/api/progress/telemetry`);
  console.log(`==================================================`);
});

export default app;
