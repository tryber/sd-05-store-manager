// const { verifyName, verifyQuantity } = require('../midlewares/verify');
const modelSales = require('../models/sales');

const insertNewSale = async (itensSold) => {
  const newSale = await modelSales.insertNewSale(itensSold);
  return newSale;
};

module.exports = { insertNewSale };
