import Boom  from '@hapi/boom';
import { Status } from '../models/status.model.js';

export class StatusService {
  constructor() {
    this.statusModel = Status;
  }

  createStatus = async (data) => {
    const status = await this.statusModel.create(data);
    return status;
  };
  
  
  
  
  
  
  

  findById = async (id) => {
    const status = await this.statusModel.findOne({ where: { id: id } });
    if (!status) {
      throw Boom.notFound('status not found');
    }
    return status;
  };

  updateById = async (id, payload) => {
    const status = await this.findById(id);
    await status.update(payload);
    return status;
  };
}
