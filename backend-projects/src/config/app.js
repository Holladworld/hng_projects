const express = require('express');
const cors = require('cors');
const profileRoutes = require('../routes/profileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', profileRoutes);

// Health check - SIMPLE VERSION
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'OK',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

module.exports = app;