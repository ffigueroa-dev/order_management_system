import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/connection/sequelize.js';

export const Status = sequelize.define(
  'Status',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Statuses',
    timestamps: true,
    paranoid: true,
  },
);
