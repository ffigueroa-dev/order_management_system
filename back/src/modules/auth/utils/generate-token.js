import jwt from 'jsonwebtoken';
import envs from '../../../envs/index.js';

export const generateToken = (user) => {
  const payload = {
    sub: user.id,
    type: user.type,
  };

  return jwt.sign(
    payload,
    envs.jwt_secret,
    {
      expiresIn: '7d',
    },
  );
};