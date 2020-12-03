const { ObjectId } = require('mongodb');
const model = require('../models/productsModel');

function showError(code, message) {
  return {
    err: {
      code: `${code}`,
      message: `${message}`,
    },
  };
}

const create = async (name, quantity) => {
  if (typeof name !== 'string' || name.length < 5) {
    return showError('invalid_data', '"name" length must be at least 5 characters long');
  }

  if (quantity <= 0) {
    return showError('invalid_data', '"quantity" must be larger than or equal to 1');
  }

  if (typeof quantity !== 'number') {
    return showError('invalid_data', '"quantity" must be a number');
  }

  const findExisting = await model.findProductByName(name);

  if (findExisting) {
    return showError('invalid_data', 'Product already exists');
  }

  return model.create(name, quantity);
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return showError('invalid_data', 'Wrong id format');
  }

  const findProductById = await model.getById(id);

  if (!findProductById) {
    return showError('invalid_data', 'Wrong id format');
  }
  return findProductById;
};

module.exports = {
  create,
  getById,
};
