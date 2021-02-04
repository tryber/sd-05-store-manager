const { ObjectId } = require('mongodb');
const modelSales = require('../models/sales');
const { verifyQuantitySales } = require('../midlewares/verify');

const insertNewSale = async (body) => {
  body.forEach((array) => verifyQuantitySales(array.quantity));
  const newSale = await modelSales.insertNewSale({ itensSold: body });
  return newSale;
};

const getSales = async () => {
  const allSales = await modelSales.getSales();
  return allSales;
};

const getSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  const sale = await modelSales.getSale(id);
  if (!sale) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return sale;
};

module.exports = { insertNewSale, getSales, getSale };
