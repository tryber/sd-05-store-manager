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

module.exports = { createSales };
