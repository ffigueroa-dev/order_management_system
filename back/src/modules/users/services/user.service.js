import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';

export class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  createUser = async (data) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = await this.userModel.create({
        ...data,
        password: hashedPassword,
      });

      // eslint-disable-next-line no-unused-vars
      const { password, updatedAt, deletedAt, ...safeUser } =
        newUser.toJSON();

      return safeUser;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      }

      if (error.name === 'SequelizeUniqueConstraintError') {
        throw Boom.badRequest('Email already exists');
      }

      throw Boom.internal('Error creating user');
    }
  };
}