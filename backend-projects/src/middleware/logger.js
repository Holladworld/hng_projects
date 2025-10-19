const logger = (req, res, next) => {
  req.log = {
    info: (message, meta = {}) => {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta);
    },
    error: (message, meta = {}) => {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta);
    },
    warn: (message, meta = {}) => {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta);
    }
  };

  // Log incoming request
  req.log.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  next();
};

module.exports = logger;