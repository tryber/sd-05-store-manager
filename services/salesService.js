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

const getAllSales = async () => salesModel.findAllSales();

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return errorMessage('not_found', 'Sale not found');
  return salesModel.findById(id);
};

const update = async (id, productId, quantity) => {
  if (quantity < 1 || typeof quantity !== 'number') return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  const editedSale = await salesModel.updateSales(id, productId, quantity);
  if (!editedSale) return errorMessage('invalid_data', 'All fields must be filled');
  return editedSale;
};

const deleteSale = async (id) => {
  const isValid = await validations(id);
  if (isValid) return errorMessage('invalid_data', 'Wrong product ID or invalid quantity');
  const removedProduct = await salesModel.deleteSale(id);
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
