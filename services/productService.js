/* eslint-disable no-tabs */
const productModel = require('../models/productModel');

const errorMessage = (code, message) => ({ err: { code, message } });

const createProduct = async (name, quantity) => {
  if (!name) {
    return errorMessage('invalid_data', '"name" length must be at least 5 characters long');
  }
  if (name.length < 5) {
    return errorMessage('invalid_data', '"name" length must be at least 5 characters long');
  }
  if (quantity <= 0) {
    return errorMessage('invalid_data', '"name" length must be at least 5 characters long');
  }
  if (!quantity === Number) return errorMessage('invalid_data', '"quantity" must be a number');
  const nameDuplicate = await productModel.findByName(name);
  if (nameDuplicate) {
    return errorMessage('invalid_data', 'Product already exists');
  }
  return productModel.insertProduct(name, quantity);
};

const getAllProducts = async () => productModel.findAllProducts();

const getProductsById = async (id) => productModel.findById(id);

const updateProduct = async (id, name, quantity) => {
  if (!name) {
    return errorMessage('"name" is required', 'invalid_data');
  }
  if (name.length < 5) {
    return errorMessage('The "name" must be at least 5 characters long.', 'invalid_data');
  }
  if (quantity <= 0) {
    return errorMessage('invalid_data', '"quantity" must be larger than or equal to 1');
  }
  if (!quantity === Number) return errorMessage('invalid_data', '"quantity" must be a number');
  const editedProduct = await productModel.updateProduct(id, name, quantity);
  if (!editedProduct) return errorMessage('All fields must be filled', 'invalid_data');
  return editedProduct;
};

const deleteProduct = async (id) => {
  const removedProduct = await productModel.deleteProduct(id);
  if (!removedProduct) return false;
  return removedProduct;
};

module.exports = {
  errorMessage,
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
};
