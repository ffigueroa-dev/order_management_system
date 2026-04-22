import express from 'express';
import { createClientSchema } from '../schemas/client.schema.js';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import { ClientService } from '../services/client.service.js';

export const clientController = express.Router();

const clientService = new ClientService();

clientController.post(
  '/',
  validatorHandler(createClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const createdClient = await clientService.createClient(req.body);
      res.json(createdClient);
    } catch (error) {
      next(error);
    }
  },
);
