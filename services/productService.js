/* eslint-disable no-tabs */
const productModel = require('../models/productModel');

const errorMessage = (message, code) => ({ err: { message, code } });

const createProduct = async (name, quantity) => {
  const productCreated = await productModel.insertProduct(name, quantity);
  console.log(name, quantity);

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

const getAllProducts = async () => {
  const gotProduct = await productModel.findAllProducts();
  if (!gotProduct) return false;
  return gotProduct;
};

const getProductsById = async (id) => {
  const gotProduct = await productModel.findById(id);
  if (!gotProduct) return false;
  return gotProduct;
};

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
  if (!editedProduct) return false;
  return editedProduct;
};

const deleteProduct = async (id) => {
  const removedProduct = await productModel.deleteProduct(id);
  if (!removedProduct) return false;
  return removedProduct;
};

// service
// const addSale = rescue(async (name, quantity) => {
//   const validSale = isValid(name, quantity);
//   if (!validSale) return false;
//   await productModel.addProduct(name, quantity);
//   return true;
// });
// controller
// const create = async (req, res) => {
// 	const { first_name, middle_name, last_name } = req.body;
// 	const author = await Author.create(first_name, middle_name, last_name);
// 	if (!author) return res.status(400).json({ message: 'Dados inválidos' });
// 	res.status(201).json({ message: 'Autor criado com sucesso! '});
// }

module.exports = {
  errorMessage,
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
};
