const { ObjectId } = require('mongodb');
const { sales } = require('../models');

const checkProduct = (salesArr) =>
  salesArr.some(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) {
      return true;
    }

    if (quantity < 1 || typeof quantity !== 'number') {
      return true;
    }

    return false;
  });

const registerSale = async (salesArr) => {
  const errTest = await checkProduct(salesArr);
  if (errTest) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  const saleRegistered = await sales.insertSale(salesArr);
  return saleRegistered;
};

const getAllSService = async () => sales.getAllSales();

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const sale = await sales.getSaleById(id);

  if (sale === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const updateSale = async (id, itensSold) => {
  const errTest = await checkProduct(itensSold);
  if (errTest) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  return sales.updateSale(id, itensSold);
};

module.exports = {
  registerSale,
  getAllSService,
  getSaleById,
  updateSale,
};
