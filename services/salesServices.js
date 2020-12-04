const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productServices = require('./productServices');

const createSales = async (itensSold) => {
  if (!itensSold) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  itensSold.forEach((item) => {
    if (
      !ObjectId.isValid(item.productId)
      || item.quantity <= 0
      || typeof item.quantity !== 'number'
    ) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });

  const newItemSold = await salesModel.createSales(itensSold);

  return newItemSold;
};

const getAllSales = () => salesModel.getAllSales();

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const itemSold = await salesModel.getSalesById(id);

  if (!itemSold) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return itemSold;
};

const updateSales = async (id, itensSold) => salesModel.updateSales(id, itensSold);
// functions for update validation
const validateSales = async (quantity) => {
  if (quantity <= 0 || typeof quantity === 'string') {
    throw { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  return true;
};
const validateProduct = async (productId) => {
  await productServices.getProductById(productId);
  return true;
};

const deleteSales = async (id) => {
  if (!id || id.length < 24) {
    throw { code: 'invalid_data', message: 'Wrong sale ID format' };
  }
  const checkSales = await salesModel.getSalesById(id);

  if (!checkSales) {
    throw { code: 'invalid_data', message: 'Wrong sale ID format' };
  }

  await salesModel.deleteSales(id);
  return checkSales;
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSales,
  validateSales,
  validateProduct,
  deleteSales,
};
