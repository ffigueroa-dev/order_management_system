import { sequelize } from '../../../db/connection/sequelize.js';

import { Order } from '../models/order.model.js';

import { getProductsOrFail } from '../utils/get-products-or-fail.js';
import { buildProductOrders } from '../utils/build-product-orders.js';
import { calculateOrderTotal } from '../utils/calculate-order-total.js';
import { createProductOrders } from '../utils/create-product-orders.js';
import { destroyProductOrder } from '../utils/destroy-product-orders.js';

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

  updateProducts = async (orderId, products) => {
    const transaction = await sequelize.transaction();

    try {
      const order = await this.findById(orderId);

      const dbProducts = await getProductsOrFail(products, transaction);

      const productOrders = buildProductOrders(products, dbProducts);

      const total = calculateOrderTotal(productOrders);


      await destroyProductOrder(orderId, transaction);


      await createProductOrders(orderId, productOrders, transaction);


      await order.update({ total }, { transaction });

      await transaction.commit();

      return await this.findById(orderId);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  updateStatus = async (orderId, payload) => {
    const order = await this.findById(orderId);
    await order.update(payload);
    return await this.findById(orderId);
  };

  updateOrder = async (orderId, payload) => {
    const order = await this.findById(orderId);
    await order.update(payload);
    return await this.findById(orderId);
  };

  deleteOrder = async (orderId)=>{
    const transaction = await sequelize.transaction();
    try {
      const order = await this.findById(orderId);
      await destroyProductOrder(orderId, transaction);
      await order.destroy({transaction});
      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}
