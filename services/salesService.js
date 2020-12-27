const { ObjectId } = require('mongodb');
const { salesModel, productsModel } = require('../models');

const register = async (itensSold) => {
  if (!itensSold) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  itensSold.forEach(async (item) => {
    const stockProduct = await productsModel.getProductById(item.productId);

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

    if ((stockProduct.quantity - item.quantity) < 0) {
      throw {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      };
    }
  });

  const sale = await salesModel.registerSale(itensSold);
  return sale;
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sale;
};

const updateSale = async (id, itensSold) => {
  const { productId, quantity } = itensSold[0];

  if (!ObjectId.isValid(productId)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  if (!quantity || typeof quantity === 'string') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  if (quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  const updatedSale = await salesModel.updateSale(id, itensSold);
  return updatedSale;
};

const deleteSale = async (id) => {
  if (!id || id.length < 24) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  const findSale = await salesModel.getSaleById(id);

  if (!findSale) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  await salesModel.deleteSale(id);

  return findSale;
};

module.exports = {
  register,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
