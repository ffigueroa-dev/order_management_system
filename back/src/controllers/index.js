import express from 'express';
import { userController } from '../modules/users/controllers/user.controller.js';
import { clientController } from '../modules/clients/controllers/client.controller.js';
import { statusController } from '../modules/statuses/controllers/status.controller.js';
import { productController } from '../modules/products/controllers/product.controller.js';
import { orderController } from '../modules/orders/controllers/order.controller.js';
import { authController } from '../modules/auth/controllers/auth.controller.js';

export const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', userController);
  router.use('/clients', clientController);
  router.use('/statuses', statusController);
  router.use('/products', productController);
  router.use('/orders', orderController);
  router.use('/auth', authController);
};
