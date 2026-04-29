import { Router } from 'express';
import { ProductService } from '../services/product.service.js';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import {
  createProductSchema,
  findProductSchema,
  updateProductSchema,
} from '../schemas/product.schema.js';

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

productController.get('/', async (req, res, next) => {
  try {
    const products = await productService.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

productController.get(
  '/:id',
  validatorHandler(findProductSchema, 'params'),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await productService.findById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

productController.patch(
  '/:id',
  validatorHandler(findProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const product = await productService.update(id, data);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

productController.delete(
  '/:id',
  validatorHandler(findProductSchema, 'params'),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const deletedProduct = await productService.delete(id);
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  },
);
