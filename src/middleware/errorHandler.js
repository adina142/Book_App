/**
 * Centralized Error Handling Middleware
 * This captures thrown errors or rejected promises and returns a clean JSON response.
 */
exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
