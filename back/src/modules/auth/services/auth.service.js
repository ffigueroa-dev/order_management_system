import Boom from '@hapi/boom';

import { User } from '../../users/models/user.model.js';

import { comparePassword } from '../utils/compare-password.js';
import { generateToken } from '../utils/generate-token.js';

export class AuthService {
  login = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw Boom.unauthorized('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw Boom.unauthorized('Invalid credentials');
    }

    const token = generateToken(user);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
      },

      token,
    };
  };
}
