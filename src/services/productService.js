const model = require('../models/addProduct');

const create = async (name, quantity) => {
  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
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

  const checkProductRegistered = await model.findByName(name);
  if (checkProductRegistered) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  return model.create(name, quantity);
};

module.exports = {
  create,
};
