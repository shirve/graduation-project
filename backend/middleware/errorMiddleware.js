const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    error: {
      type: err.type,
      message: err.message,
    },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}

module.exports = {
  errorHandler,
}
