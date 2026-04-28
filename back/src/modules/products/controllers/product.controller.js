import { Router } from 'express';
import { ProductService } from '../services/product.service.js';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import { createProductSchema } from '../schemas/product.schema.js';

export const productController = Router();
const productService = new ProductService();

productController.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    try {
      const product = await productService.create(data);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);
