const { ObjectId } = require('mongodb');
const model = require('../models/productsModel');

const getAll = async () => model.getAllProducts();

const getById = async (id) => {
  if (!id) {
    throw {
      code: 'invalid_data', message: 'Wrong id format',
    };
  }
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data', message: 'Wrong id format',
    };
  }

  const product = await model.getProductsById(id);

  if (!product) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  return product;
};

const create = async (name, quantity) => {
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
  if (!quantity || typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  const productExists = await model.getProductByName(name);
  if (productExists) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  const newProduct = await model.createProducts(name, quantity);

  return newProduct;
};

const update = async (id, name, quantity) => {
  if (!id) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
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
  if (!quantity || (typeof quantity !== 'number') || !Number.isInteger(quantity)) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  model.updateProducts(id, name, quantity);

  return { name, quantity };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
