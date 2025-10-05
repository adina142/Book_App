/**
 * Send a standardized success response
 */
exports.sendSuccess = (res, statusCode = 200, data = {}, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send a standardized error response
 */
exports.sendError = (res, statusCode = 500, message = 'Server Error') => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
