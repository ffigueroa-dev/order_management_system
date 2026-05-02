import Boom from '@hapi/boom';

import { verifyToken } from '../utils/verify-token.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw Boom.unauthorized('Authorization header is required');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw Boom.unauthorized('Invalid authorization format');
    }

    const token = parts[1];

    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch  {
    next(Boom.unauthorized('Invalid or expired token'));
  }
};
