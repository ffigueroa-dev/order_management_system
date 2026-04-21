export const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
};

export const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output, data } = err;

    return res.status(output.statusCode).json({
      ...output.payload,
      ...(data && { data }), 
    });
  }

  next(err);
};
