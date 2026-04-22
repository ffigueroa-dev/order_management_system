import express from 'express';
import {
  createClientSchema,
  findClientSchema,
} from '../schemas/client.schema.js';
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

clientController.get(
  '/:id',
  validatorHandler(findClientSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const client = await clientService.findById(id);
      res.json(client);
    } catch (error) {
      next(error);
    }
  },
);
