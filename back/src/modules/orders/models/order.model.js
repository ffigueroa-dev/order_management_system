import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/connection/sequelize.js';

export const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'Orders',
    timestamps: true,
    paranoid: true,
  },
);

Order.associate = (models) => {
  Order.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });

  Order.belongsTo(models.Client, {
    foreignKey: 'clientId',
    as: 'client',
  });

  Order.belongsTo(models.Status, {
    foreignKey: 'statusId',
    as: 'status',
  });

  Order.belongsToMany(models.Product, {
    through: models.ProductOrder,
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'products',
  });

  Order.hasMany(models.ProductOrder, {
    foreignKey: 'orderId',
    as: 'productOrders',
  });
};