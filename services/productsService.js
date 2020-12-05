const { ObjectId } = require('mongodb');
const model = require('../models/productsModel');

const create = async (name, quantity) => {
  const getExistentProduct = await model.getProductByName(name);

  if (!name) {
    throw {
      code: 'invalid_data',
      message: '"name" should exist',
    };
  }

  if (name.length <= 5) {
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

  if (typeof quantity === 'string') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }

  if (getExistentProduct !== null) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const newProduct = await model.create(name, quantity);
  return newProduct;
};

const getAll = async () => model.getAllProducts();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const product = await model.getProductById(id);

  if (!product) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  return product;
};

const update = async (id, name, quantity) => model.updateProduct(id, name, quantity);

module.exports = {
  create,
  getAll,
  getById,
  update,
};
