import Boom from '@hapi/boom';

import { Product } from '../models/product.model.js';

export class ProductService {
  constructor() {
    this.model = Product;
  }

  create = async (data) => {
    const product = await this.model.create(data);
    return product;
  };

  findAll = async () => {
    const products = await this.model.findAll();
    return products;
  };

  findById = async (id) => {
    const product = await this.model.findByPk(id);
    if (!product) {
      throw Boom.notFound('Product not found');
    }
    return product;
  };
}
