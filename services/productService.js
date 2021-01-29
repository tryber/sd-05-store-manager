/* eslint-disable no-tabs */
const productModel = require('../models/productModel');

const errorMessage = (message, code) => ({ err: { message, code } });

const createProduct = async (name, quantity) => {
  const productCreated = await productModel.insertProduct(name, quantity);

  if (!name) {
    return errorMessage('"name" is required', 'invalid_data');
  }
  if (name.length < 5) {
    return errorMessage('The "name" must be at least 5 characters long.', 'invalid_data');
  }
  if (!quantity.isInteger() || quantity <= 0) {
    return errorMessage('The "quantity" must be equal or larger than 1.', 'invalid_data');
  }
  return productCreated;
};

const getAllProducts = async () => productModel.findAllProducts();

const getProductsById = async (id) => productModel.findById(id);

const updateProduct = async (id, name, quantity) => {
  const editedProduct = await productModel.updateProduct(id, name, quantity);
  if (!name) {
    return errorMessage('"name" is required', 'invalid_data');
  }
  if (name.length < 5) {
    return errorMessage('The "name" must be at least 5 characters long.', 'invalid_data');
  }
  if (!quantity.isInteger() || quantity <= 0) {
    return errorMessage('The "quantity" must be equal or larger than 1.', 'invalid_data');
  }
  if (!editedProduct) return errorMessage('All fields must be filled', 'invalid_data');
  const newRecipe = await productModel.findById(id);
  return newRecipe;
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
