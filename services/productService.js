// camada situada entre controller e model
// Responsável pela logica de negocio
const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

function erros(code, message) {
  return {
    err: {
      code: `${code}`,
      message: `${message}`,
    },
  };
}

const create = async (name, quantity) => {
  if (typeof name !== 'string' || name.length < 5) {
    return erros('invalid_data', '"name" length must be at least 5 characters long');
  }

  if (quantity <= 0) {
    return erros('invalid_data', '"quantity" must be larger than or equal to 1');
  }

  if (typeof quantity !== 'number') {
    return erros('invalid_data', '"quantity" must be a number');
  }

  const productExist = await productModel.productByName(name);

  if (productExist) {
    return erros('invalid_data', 'Product already exists');
  }

  return productModel.create(name, quantity);
};

const showById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return erros('invalid_data', 'Wrong id format');
  }
  const productById = await productModel.showById(id);
  if (!productById) {
    return erros('invalid_data', 'Wrong id format');
  }
  return productById;
};

module.exports = {
  create,
  showById,
};
