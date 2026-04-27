import { Status } from '../models/status.model.js';

export class StatusService {
  constructor() {
    this.statusModel = Status;
  }

  createStatus = async (data) => {
    const status = await this.statusModel.create(data);
    return status;
  };
}
