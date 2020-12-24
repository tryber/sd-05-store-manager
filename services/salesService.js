// const { ObjectId } = require('mongodb');
const salesModels = require('../models/salesModel');
const productModels = require('../models/productsModel');

function showError(code, message) {
  return {
    err: {
      code: `${code}`,
      message: `${message}`,
    },
  };
}

const create = async (productId, quantity) => {
  const productExists = await productModels.getById(productId);

  if (!productExists || quantity <= 0 || typeof quantity === 'string') {
    showError('invalid_data', 'Wrong product ID or invalid quantity');
  }

  return salesModels.insertSale(productId, quantity);
};

module.exports = {
  create,
};
