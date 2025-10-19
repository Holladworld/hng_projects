require('dotenv').config();
const app = require('./config/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server running in ${process.env.NODE_ENV || 'development'} mode
📡 Port: ${PORT}
⏰ Started at: ${new Date().toISOString()}
🔍 Health check: http://localhost:${PORT}/health
👤 Profile endpoint: http://localhost:${PORT}/api/me
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});

module.exports = server;