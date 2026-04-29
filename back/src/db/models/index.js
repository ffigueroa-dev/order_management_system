import { Client } from '../../modules/clients/models/client.model.js';
import { Order } from '../../modules/orders/models/order.model.js';
import { ProductOrder } from '../../modules/orders/models/product-order.model.js';
import { Product } from '../../modules/products/models/product.model.js';
import { Status } from '../../modules/statuses/models/status.model.js';
import { User } from '../../modules/users/models/user.model.js';

const models = {
  User,
  Client,
  Product,
  Status,
  Order,
  ProductOrder,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { models };
