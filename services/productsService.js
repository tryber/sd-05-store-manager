const productModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const productAlreadyExists = await productModel.findByName(name);

  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (productAlreadyExists) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  if (+quantity < 1) {
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
  return productModel.create(name, quantity);
};

module.exports = {
  create,
};
