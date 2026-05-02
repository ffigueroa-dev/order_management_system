import { Router } from 'express';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import {
  createOrderSchema,
  findOrderSchema,
  updateOrderProductsSchema,
  updateOrderSchema,
  updateOrderStatusSchema,
} from '../schemas/order.schema.js';
import { OrderService } from '../services/order.service.js';
import { authMiddleware } from '../../auth/middlewares/auth.middleware.js';
import { ROLES } from '../../../shared/constants/roles.js';
import { allowRoles } from '../../auth/middlewares/roles.midleware.js';

export const orderController = Router();
const orderService = new OrderService();

orderController.use(authMiddleware);

orderController.post(
  '/',
  allowRoles(ROLES.OWNER),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;

    try {
      const order = await orderService.create(data);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

orderController.get(
  '/',
  allowRoles(ROLES.OWNER, ROLES.DELIVERY),
  async (req, res, next) => {
    try {
      const orders = await orderService.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  },
);

orderController.get(
  '/:id',
  allowRoles(ROLES.OWNER, ROLES.DELIVERY),
  validatorHandler(findOrderSchema, 'params'),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const order = await orderService.findById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

orderController.patch(
  '/:id/products',
  allowRoles(ROLES.OWNER),
  validatorHandler(findOrderSchema, 'params'),
  validatorHandler(updateOrderProductsSchema, 'body'),
  async (req, res, next) => {
    const products = req.body.products;
    const orderId = req.params.id;
    try {
      const updatedOrder = await orderService.updateProducts(orderId, products);
      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  },
);

orderController.patch(
  '/:id/status',
  allowRoles(ROLES.OWNER, ROLES.DELIVERY),
  validatorHandler(findOrderSchema, 'params'),
  validatorHandler(updateOrderStatusSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    const orderId = req.params.id;
    try {
      const updatedOrder = await orderService.updateStatus(orderId, data);
      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  },
);

orderController.patch(
  '/:id',
  allowRoles(ROLES.OWNER),
  validatorHandler(findOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    const orderId = req.params.id;
    try {
      const updatedOrder = await orderService.updateOrder(orderId, data);
      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  },
);

orderController.delete(
  '/:id',
  allowRoles(ROLES.OWNER),
  validatorHandler(findOrderSchema, 'params'),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const deletedOrder = await orderService.deleteOrder(id);
      res.json(deletedOrder);
    } catch (error) {
      next(error);
    }
  },
);
