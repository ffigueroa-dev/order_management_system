import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/connection/sequelize.js';

export const Client = sequelize.define(
  'Client',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    fullAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Clients',
    timestamps: true,
    paranoid: true,
  }
);

