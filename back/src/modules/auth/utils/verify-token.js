import jwt from 'jsonwebtoken';
import envs from '../../../envs/index.js';

export const verifyToken = (token) => {
  return jwt.verify(
    token,
    envs.jwt_secret,
  );
};