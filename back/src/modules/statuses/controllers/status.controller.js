import express from 'express';
import { StatusService } from '../services/status.service.js';
import {
  createStatusSchema,
  findStatusSchema,
  updateStatusSchema,
} from '../schemas/status.schema.js';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import { authMiddleware } from '../../auth/middlewares/auth.middleware.js';
import { allowRoles } from '../../auth/middlewares/roles.midleware.js';
import { ROLES } from '../../../shared/constants/roles.js';

export const statusController = express.Router();
const statusService = new StatusService();

statusController.use(authMiddleware);

statusController.use(
  allowRoles(ROLES.OWNER),
);

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

statusController.delete(
  '/:id',
  validatorHandler(findStatusSchema, 'params'),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const deletedStatus = await statusService.deleteById(id);
      res.json(deletedStatus);
    } catch (error) {
      next(error);
    }
  },
);
