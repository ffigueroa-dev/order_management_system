import express from 'express';
import { StatusService } from '../services/status.service.js';
import { createStatusSchema } from '../schemas/status.schema.js';
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
