import express from 'express';
import { userController } from '../modules/users/controllers/user.controller.js';

export const routerApi =(app)=>{
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userController);
};

