import Boom from '@hapi/boom';
import { Client } from '../models/client.model.js';

export class ClientService {
  // constructor()

  createClient = async (data) => {
    try {
      const createdClient = await Client.create(data);
      return createdClient;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw Boom.badRequest('Email already exists');
      }
      throw error;
    }
  };
}
