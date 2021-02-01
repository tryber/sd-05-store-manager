/* eslint-disable no-tabs */
const salesModel = require('../models/salesModel');

const errorMessage = (message, code) => ({ err: { code, message } });

const insertSale = async (productId, quantity) => {
  console.log('aqui no service', productId, quantity);
  if (quantity <= 0) {
    return errorMessage('invalid_data', 'Wrong product ID or invalid quantity 1');
  }
  if (!quantity === Number) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity 2 ');
  if (!productId) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity 3');
  if (!quantity) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity 4');
  const sale = await salesModel.insertSale(productId, quantity);
  return sale;
};

const getAllSales = async () => salesModel.findAllSales();

const getSaleById = async (id) => salesModel.findById(id);

const update = async (productId, quantity) => {
  if (quantity <= 0) {
    return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  }
  if (!quantity !== Number) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  const editedSale = await salesModel.updateSales(productId, quantity);
  if (!editedSale) return errorMessage('invalid_data', 'All fields must be filled');
  return editedSale;
};

const deleteSale = async (id) => {
  const removedProduct = await salesModel.deleteSale(id);
  if (!removedProduct) return false;
  return removedProduct;
};

module.exports = {
  errorMessage,
  insertSale,
  getAllSales,
  getSaleById,
  update,
  deleteSale,
};
