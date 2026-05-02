import express from 'express';
import {
  createClientSchema,
  findClientSchema,
  updateClientSchema,
} from '../schemas/client.schema.js';
import { validatorHandler } from '../../../middlewares/validatorHandler.js';
import { ClientService } from '../services/client.service.js';
import { authMiddleware } from '../../auth/middlewares/auth.middleware.js';
import { allowRoles } from '../../auth/middlewares/roles.midleware.js';
import { ROLES } from '../../../shared/constants/roles.js';

export const clientController = express.Router();

const clientService = new ClientService();

clientController.use(authMiddleware);

clientController.use(
  allowRoles(ROLES.OWNER),
);

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

clientController.patch(
  '/:id',
  validatorHandler(findClientSchema, 'params'),
  validatorHandler(updateClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const payload = req.body;
      const updatedClient = await clientService.updateClient(id, payload);
      res.json(updatedClient);
    } catch (error) {
      next(error);
    }
  },
);
clientController.get('/', async (req, res, next) => {
  try {
    const clients = await clientService.findAll();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

clientController.delete(
  '/:id',
  validatorHandler(findClientSchema, 'params'),
  async (req, res, next) => {
    try {
      const deletedClient = await clientService.deleteClient(req.params.id);
      res.json(deletedClient);
    } catch (error) {
      next(error);
    }
  },
);
