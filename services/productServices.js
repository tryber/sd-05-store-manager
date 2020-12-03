const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const createProductAuth = async (name, quantity) => {
  const checkName = await productModel.getProductByName(name);
  const newProduct = await productModel.createProduct(name, quantity);

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
  if (checkName) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  return newProduct;
};

const getAllProductsAuth = async () => productModel.getAllProducts();

const getProductByIdAuth = async (id) => {
  const product = await productModel.getProductById(id);

  if (!id || !ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  if (!product) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return product;
};

const updateProductAuth = async (id, name, quantity) =>
  productModel.updateProduct(id, name, quantity);

module.exports = { createProductAuth, getAllProductsAuth, getProductByIdAuth, updateProductAuth };
