/* eslint-disable no-tabs */
const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const errorMessage = (message, code) => ({ err: { code, message } });

const createSale = async (sales) => {
  sales.forEach((element) => {
    const idProduct = productModel.findById(element.productId);
    if (!idProduct || sales.quantity < 1 || typeof sales.quantity !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  });
  const insertSale = await salesModel.insertSale(sales);
  return insertSale;
};

const getAllSales = async () => salesModel.findAllSales();

const getSaleById = async (id) => salesModel.findById(id);

const update = async (id, productId, quantity) => {
  if (quantity < 1 || typeof quantity !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  const editedSale = await salesModel.updateSales(id, productId, quantity);
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
  createSale,
  getAllSales,
  getSaleById,
  update,
  deleteSale,
};
