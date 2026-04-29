import { ProductOrder } from '../models/product-order.model.js';

export const createProductOrders = async (
  orderId,
  productOrders,
  transaction,
) => {
  const payload = productOrders.map((product) => ({
    ...product,
    orderId,
  }));

  return await ProductOrder.bulkCreate(payload, {
    transaction,
  });
};