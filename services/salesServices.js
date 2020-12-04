const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

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

module.exports = { createSales, getAllSales, getSalesById };
