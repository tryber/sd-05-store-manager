const model = require('../model/productModel');

const create = async (name, quantity) => {
  if (typeof name !== 'string') {
    throw {
      code: 'invalid_data',
      message: 'product name must be a string',
    };
  }

  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  const hasProduct = await model.hasProduct(name);

  if (hasProduct) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  if (quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }

  return model.create(name, quantity);
};

const getAllProducts = async () => {
  const productList = await model.getAllProducts();
  return productList;
};

const getProductById = async (id) => {
  const hasProductId = await model.getById(id);
  if (!hasProductId) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  return hasProductId;
};

module.exports = {
  create,
  getAllProducts,
  getProductById,
};
