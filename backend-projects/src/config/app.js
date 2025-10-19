const express = require('express');
const cors = require('cors');
// Remove helmet and rate-limit for now to simplify
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

const profileRoutes = require('../routes/profileRoutes');
const errorHandler = require('../middleware/errorHandler');
const logger = require('../middleware/logger');

const app = express();

// Security middleware (commented out for now)
// app.use(helmet());

// Rate limiting (commented out for now)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || '*',
  methods: ['GET']
}));

// Logging middleware
app.use(logger);

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api', profileRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Profile endpoint at root level (as required by the task)
app.use('/', profileRoutes);

// 404 handler for unmatched routes - FIXED VERSION
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;