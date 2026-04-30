import { Router } from 'express';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import {
  createOrderSchema,
  findOrderSchema,
  updateOrderProductsSchema,
  updateOrderStatusSchema,
} from '../schemas/order.schema.js';
import { OrderService } from '../services/order.service.js';

export const orderController = Router();
const orderService = new OrderService();

orderController.post(
  '/',
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

orderController.get('/', async (req, res, next) => {
  try {
    const orders = await orderService.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

orderController.get(
  '/:id',
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
