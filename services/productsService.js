const { ObjectId } = require('mongodb');
const models = require('../models');

const create = async (name, quantity) => {
  const getExistentProduct = await models.productsModel.getProductByName(name);

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

  const newProduct = await models.productsModel.create(name, quantity);
  return newProduct;
};

const getAll = async () => models.productsModel.getAllProducts();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const product = await models.productsModel.getProductById(id);

  if (!product) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  return product;
};

const update = async (id, name, quantity) => models.productsModel.updateProduct(id, name, quantity);

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const deletedProduct = await models.productsModel.deleteProduct(id);
  await models.productsModel.deleteProduct(id);

  return deletedProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
