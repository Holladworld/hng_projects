const constants = require('../config/constants');

const errorHandler = (err, req, res, next) => {
  console.error('Global Error Handler:', err);

  // Default error
  let error = { 
    message: constants.RESPONSE_MESSAGES.SERVICE_UNAVAILABLE,
    statusCode: constants.HTTP_STATUS.INTERNAL_ERROR
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(val => val.message).join(', ');
    error.statusCode = constants.HTTP_STATUS.BAD_REQUEST;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error.message = 'Duplicate field value entered';
    error.statusCode = constants.HTTP_STATUS.BAD_REQUEST;
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error.message = 'Resource not found';
    error.statusCode = constants.HTTP_STATUS.NOT_FOUND;
  }

  res.status(error.statusCode).json({
    status: constants.RESPONSE_MESSAGES.ERROR,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;