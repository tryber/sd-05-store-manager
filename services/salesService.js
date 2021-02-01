/* eslint-disable no-tabs */
const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const errorMessage = (message, code) => ({ err: { code, message } });

const checkSale = (sales) =>
  sales.filter((productId, quantity) => {
    if (!ObjectId.isValid(productId)) return false;
    if (quantity < 1 || typeof quantity !== 'number') return false;
    return true;
  });

const insertSale = async (sales) => {
  const validation = await checkSale(sales);
  if (!validation) {
    return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  }
  const saleChecked = await salesModel.insertSale(sales);
  return saleChecked;
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
