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
  return allSales;
};

const getSaleById = async (id) => {
  const saleId = await salesModel.findById(id);
  if (!ObjectId.isValid(id) || !saleId) return errorMessage('not_found', 'Sale not found');
  return saleId;
};

const updateSale = async (id, itensSold) => {
  itensSold.forEach(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) throw errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
    if (typeof quantity === 'string' || quantity <= 0) throw errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  });
  const editedSale = await salesModel.updateSale(id, itensSold);
  if (!editedSale) return errorMessage('invalid_data', 'All fields must be filled');
  const saleMade = await getSaleById(id);
  return saleMade;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return errorMessage('invalid_data', 'Wrong sale ID format');
  const saleId = await getSaleById(id);
  if (!saleId) return errorMessage('invalid_data', 'Wrong sale ID format');
  const removeSale = await salesModel.deleteSale(id);
  console.log('aqui no service 2', removeSale);
  return saleId;
};

module.exports = {
  errorMessage,
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
