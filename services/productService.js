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
    return errorMessage('invalid_data', '"quantity" must be larger than or equal to 1');
  }
  if (typeof quantity !== 'number') return errorMessage('invalid_data', '"quantity" must be a number');
  const nameDuplicate = await productModel.findByName(name);
  if (nameDuplicate) {
    return errorMessage('invalid_data', 'Product already exists');
  }
  return productModel.insertProduct(name, quantity);
};

const getAllProducts = async () => {
  const allProducts = await productModel.findAllProducts();
  if (!allProducts) return errorMessage('invalid_data', 'Wrong id format');
  return allProducts;
};

const getProductsById = async (id) => {
  const idProduct = await productModel.findById(id);
  if (!idProduct) return errorMessage('invalid_data', 'Wrong id format');
  return idProduct;
};

const updateProduct = async (id, name, quantity) => {
  if (!name) {
    return errorMessage('invalid_data', '"name" is required');
  }
  if (name.length < 5) {
    return errorMessage('invalid_data', '"name" length must be at least 5 characters long');
  }
  if (quantity <= 0) {
    return errorMessage('invalid_data', '"quantity" must be larger than or equal to 1');
  }
  if (typeof quantity !== 'number') return errorMessage('invalid_data', '"quantity" must be a number');
  const editedProduct = await productModel.updateProduct(id, name, quantity);
  if (!editedProduct) return errorMessage('invalid_data', 'All fields must be filled');
  return editedProduct;
};

const deleteProduct = async (id) => {
  const product = productModel.findById(id);
  const removedProduct = await productModel.deleteProduct(id);
  if (!removedProduct) return errorMessage('invalid_data', 'Wrong id format');
  return product;
};

module.exports = {
  errorMessage,
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
};
