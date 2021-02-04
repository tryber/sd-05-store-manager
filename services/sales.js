// const { verifyName, verifyQuantity } = require('../midlewares/verify');
const { forEachChild } = require('typescript');
const modelSales = require('../models/sales');
const { verifyQuantitySales } = require('../midlewares/verify');

const insertNewSale = async (itensSold) => {
  itensSold.forEach((array) => verifyQuantitySales(array.quantity));
  const newSale = await modelSales.insertNewSale(itensSold);
  return newSale;
};

module.exports = { insertNewSale };
