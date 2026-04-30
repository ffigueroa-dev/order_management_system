import { ProductOrder } from '../models/product-order.model.js';

export const destroyProductOrder = async (orderId, transaction) => {
  await ProductOrder.destroy({
    where: {
      orderId,
    },
    transaction,
  });
};
