// camada situada entre controller e model
// Responsável pela logica de negocio
const productModel = require('../models/produtosModel');

const create = async (name, quantity) => {
  const cpv = await productModel.getProducts(name);

  if (name.length <= 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity >= 0) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof quantity === 'string') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }

  if (cpv !== null) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  create,
};
