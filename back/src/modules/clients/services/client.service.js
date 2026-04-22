import Boom from '@hapi/boom';
import { Client } from '../models/client.model.js';

export class ClientService {
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

  findById = async (id) => {
    const client = await Client.findByPk(id);
    if (!client) {
      throw Boom.notFound('Client not found');
    }
    return client;
  };

  updateClient = async (id, payload) => {
    const user = await this.findById(id);
    await user.update(payload);
    return user;
  };
  
  findAll = async () => {
    const clients = await Client.findAll();
    return clients;
  };

  deleteClient = async (id) => {
    const client =  await this.findById(id);
    await client.destroy();
    return client;
  };
}
