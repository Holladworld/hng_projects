require('dotenv').config();
const app = require('./config/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  const environment = process.env.NODE_ENV || 'development';
  const isProduction = environment === 'production';
  
  // Railway provides this environment variable
  const railwayPublicUrl = process.env.RAILWAY_PUBLIC_DOMAIN 
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
    : process.env.RAILWAY_STATIC_URL;

  console.log(`
🚀 Server running in ${environment} mode
📡 Port: ${PORT} 
⏰ Started at: ${new Date().toISOString()}

📍 Local Access:
🔍 Health check: http://localhost:${PORT}/health
👤 Profile endpoint: http://localhost:${PORT}/me
${railwayPublicUrl ? `
🌐 Railway Deployment:
🔍 Health check: ${railwayPublicUrl}/health
👤 Profile endpoint: ${railwayPublicUrl}/me` : '\n🚀 Deploy to Railway to get public URL'}
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