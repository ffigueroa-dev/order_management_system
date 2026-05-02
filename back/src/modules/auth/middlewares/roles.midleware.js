import Boom from '@hapi/boom';

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      // VALIDATE AUTH

      if (!user) {
        throw Boom.unauthorized(
          'User is not authenticated',
        );
      }

      // VALIDATE ROLE

      if (!roles.includes(user.type)) {
        throw Boom.forbidden(
          'You do not have permission to access this resource',
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};