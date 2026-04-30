import { sequelize } from '../../../db/connection/sequelize.js';

import { Order } from '../models/order.model.js';

import { getProductsOrFail } from '../utils/get-products-or-fail.js';
import { buildProductOrders } from '../utils/build-product-orders.js';
import { calculateOrderTotal } from '../utils/calculate-order-total.js';
import { createProductOrders } from '../utils/create-product-orders.js';

export class OrderService {
  constructor() {
    this.model = Order;
  }

  create = async (data) => {
    const transaction = await sequelize.transaction();

    try {
      const dbProducts = await getProductsOrFail(data.products, transaction);

      const productOrders = buildProductOrders(data.products, dbProducts);

      const total = calculateOrderTotal(productOrders);

      const order = await this.model.create(
        {
          userId: data.userId,
          clientId: data.clientId,
          statusId: data.statusId,
          notes: data.notes,
          total,
        },
        {
          transaction,
        },
      );

      await createProductOrders(order.id, productOrders, transaction);

      await transaction.commit();

      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  find = async () => {
    const orders = await Order.findAll({
      include: [
        { association: 'client' },
        { association: 'user', attributes: { exclude: ['password'] } },
        { association: 'status' },
      ],
    });
    return orders;
  };

  findById = async (id) => {
    const order = await Order.findByPk(id, {
      include: [
        { association: 'client' },
        { association: 'user', attributes: { exclude: ['password'] } },
        { association: 'status' },
        {
          association: 'products',
          through: {
            attributes: ['quantity', 'unitPrice', 'subtotal'],
          },
        },
      ],
    });
    return order;
  };
}
