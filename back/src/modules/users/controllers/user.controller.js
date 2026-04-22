import { Router } from 'express';
import { UserService } from '../services/user.service.js';
import { User } from '../models/user.model.js';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import { createUserSchema } from '../schemas/user.schema.js';

export const userController = Router();
const userService = new UserService(User);

userController.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const createdUser = await userService.createUser(data);
      res.json(createdUser);
    } catch (error) {
      next(error);
    }
  },
);
userController.get('/', async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
userController.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});
