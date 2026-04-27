import express from 'express';
import { StatusService } from '../services/status.service.js';
import {
  createStatusSchema,
  findStatusSchema,
  updateStatusSchema,
} from '../schemas/status.schema.js';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';

export const statusController = express.Router();
const statusService = new StatusService();

statusController.post(
  '/',
  validatorHandler(createStatusSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newStatus = await statusService.createStatus(data);
      res.json(newStatus);
    } catch (error) {
      next(error);
    }
  },
);

statusController.patch(
  '/:id',
  validatorHandler(findStatusSchema, 'params'),
  validatorHandler(updateStatusSchema, 'body'),
  async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    try {
      const newStatus = await statusService.updateById(id, data);
      res.json(newStatus);
    } catch (error) {
      next(error);
    }
  },
);

statusController.get('/', async (req, res, next) => {
  try {
    const statuses = await statusService.findAll();
    res.json(statuses);
  } catch (error) {
    next(error);
  }
});
