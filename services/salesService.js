const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const errorMessage = (code, message) => ({ err: { code, message } });

const validations = (sales) =>
  sales.some(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) return true;
    if (quantity < 1 || typeof quantity !== 'number') return true;
    return false;
  });

const createSale = async (sales) => {
  const isValid = await validations(sales);
  console.log(isValid);
  if (isValid) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  return salesModel.insertSale(sales);
};

const getAllSales = async () => {
  const allSales = await salesModel.findAllSales();
  if (!allSales) return errorMessage('not_found', 'Sale not found');
  console.log('aqui no service', allSales);
  return allSales;
};

const getSaleById = async (id) => {
  const saleId = await salesModel.findById(id);
  if (!ObjectId.isValid(id) || !saleId) return errorMessage('not_found', 'Sale not found');
  return saleId;
};

const update = async (id, productId, quantity) => {
  if (quantity < 1 || typeof quantity !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  const editedSale = await salesModel.updateSales(id, productId, quantity);
  if (!editedSale) return errorMessage('invalid_data', 'All fields must be filled');
  return editedSale;
};

const deleteSale = async (id) => {
  const saleId = await getSaleById(id);
  console.log('aqui no service', saleId);
  if (ObjectId.isValid(id) || !saleId) return errorMessage('invald_data', 'Wrong sale ID format');
  const removeSale = await salesModel.deleteSale(id);
  console.log('aqui no service 2', removeSale);
  return removeSale;
};

module.exports = {
  errorMessage,
  createSale,
  getAllSales,
  getSaleById,
  update,
  deleteSale,
};
