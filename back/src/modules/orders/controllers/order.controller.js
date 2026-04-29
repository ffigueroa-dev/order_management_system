import { Router } from 'express';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import { createOrderSchema } from '../schemas/order.schema.js';
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
