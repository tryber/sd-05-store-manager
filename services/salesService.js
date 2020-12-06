const { ObjectId } = require('mongodb');
const { salesModel } = require('../models');

const register = async (itensSold) => {
  if (!itensSold) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  itensSold.forEach((item) => {
    if (!ObjectId.isValid(item.productId)) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (!item.quantity || typeof item.quantity === 'string') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (item.quantity <= 0) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });

  const sale = await salesModel.registerSale(itensSold);
  return sale;
};

module.exports = {
  register,
};
