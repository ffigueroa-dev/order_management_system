import { Sequelize } from 'sequelize';
import envs from '../../envs/index.js';

export const sequelize = new Sequelize(
  envs.db_name,
  envs.db_user,
  envs.db_pass,
  {
    host: envs.db_host,
    port:envs.db_port,
    dialect: 'postgres',
  },
);
