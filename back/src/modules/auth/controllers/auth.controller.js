import { Router } from 'express';

import { AuthService } from '../services/auth.service.js';

import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import { loginUserSchema } from '../schemas/auth.schema.js';



export const authController = Router();

const service = new AuthService();

authController.post(
  '/login',

  validatorHandler(loginUserSchema, 'body'),

  async (req, res, next) => {
    try {
      const response = await service.login(req.body);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
);
