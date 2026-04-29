import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/connection/sequelize.js';

export const ProductOrder = sequelize.define(
  'ProductOrder',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'ProductOrders',
    timestamps: true,
  },
);

ProductOrder.associate = (models) => {
  ProductOrder.belongsTo(models.Order, {
    foreignKey: 'orderId',
    as: 'order',
  });

  ProductOrder.belongsTo(models.Product, {
    foreignKey: 'productId',
    as: 'product',
  });
};