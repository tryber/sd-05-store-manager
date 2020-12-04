const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
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
  if (!quantity || typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }

  const checkName = await productModel.getProductByName(name);
  if (checkName) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const newProduct = await productModel.createProduct(name, quantity);
  return newProduct;
};

const getAllProducts = async () => productModel.getAllProducts();

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }

  const product = await productModel.getProductById(id);
  if (!product) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }

  return product;
};

const updateProduct = async (id, name, quantity) => productModel.updateProduct(id, name, quantity);

const deleteProduct = async (id) => productModel.deleteProduct(id);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
