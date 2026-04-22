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
      const { password, updatedAt, deletedAt, ...safeUser } = newUser.toJSON();

      return safeUser;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw Boom.badRequest('Email already exists');
      }

      throw error;
    }
  };

  findAll = async () => {
    const users = await this.userModel.findAll({
      attributes: {
        exclude: ['updatedAt', 'deletedAt', 'password'],
      },
    });

    return users;
  };

  findById = async (id) => {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw Boom.notFound('user not found');
    }

    return user;
  };

  deleteUser = async (id) => {
    const user = await this.findById(id);
    await user.destroy();

    const { password, ...safeUser } = user.toJSON();
    return safeUser;
  };

  updateUser = async (id, payload) => {
    const user = await this.findById(id);
    if (!user) {
      throw Boom.notFound('user not found');
    }
    const data = { ...payload };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await user.update(data);

    const { password, ...safeUser } = user.toJSON();
    return safeUser;
  };
}
