function errorHandler(err, req, res, next) {
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    status: err.status || 500
  });

  const status = err.status || 500;
  const message = err.message || "An unexpected error occurred";

  res.status(status).json({
    message: message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
}

module.exports = errorHandler;