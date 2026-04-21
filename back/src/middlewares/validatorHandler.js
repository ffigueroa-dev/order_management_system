import boom from '@hapi/boom';

export const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];

    const result = schema.safeParse(data);

    if (!result.success) {
      return next(
        boom.badRequest('Invalid data', {
          errors: result.error.flatten(),
        })
      );
    }

    req[property] = result.data;

    next();
  };
};