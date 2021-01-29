/* eslint-disable no-tabs */
const salesModel = require('../models/salesModel');

const errorMessage = (message, code) => ({ err: { message, code } });

const insertSale = async (itemSold) => {
  if (!itemSold) return errorMessage('Wrong product ID or invalid quantity', 'invalid_data');
  const sale = await salesModel.insertSales(itemSold);
  return sale;
};

const getAllSales = async () => salesModel.findAllSales();

const getSaleById = async (id) => salesModel.findById(id);

const update = async (id, name, quantity) => {
  const editedSale = await salesModel.updateSales(id, name, quantity);
  if (!name) {
    return errorMessage('"name" is required', 'invalid_data');
  }
  if (name.length < 5) {
    return errorMessage('The "name" must be at least 5 characters long.', 'invalid_data');
  }
  if (!quantity.isInteger() || quantity <= 0) {
    return errorMessage('The "quantity" must be equal or larger than 1.', 'invalid_data');
  }
  if (!editedSale) return errorMessage('All fields must be filled', 'invalid_data');
  const newRecipe = await salesModel.findById(id);
  return newRecipe;
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
