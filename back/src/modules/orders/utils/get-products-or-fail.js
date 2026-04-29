import Boom from '@hapi/boom';

import { Product } from '../../products/models/product.model.js';

export const getProductsOrFail = async (
  products,
  transaction,
) => {
  const productIds = products.map(
    (product) => product.productId,
  );

  const dbProducts = await Product.findAll({
    where: {
      id: productIds,
    },
    transaction,
  });

  if (dbProducts.length !== productIds.length) {
    throw Boom.badRequest(
      'One or more products do not exist',
    );
  }

  return dbProducts;
};