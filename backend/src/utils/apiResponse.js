/**
 * Format success responses uniformly
 */
exports.successResponse = (res, statusCode = 200, message = 'Success', data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Format error responses uniformly
 */
exports.errorResponse = (res, statusCode = 500, message = 'Server Error', errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
