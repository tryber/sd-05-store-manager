const { ObjectId } = require('mongodb');
const modelSales = require('../models/sales');
const { verifyQuantitySales } = require('../midlewares/verify');
const { getById } = require('./products');

const insertNewSale = async (body) => {
  body.forEach((product) => verifyQuantitySales(product.quantity));
  const promissesArray = body.map((product) => getById(product.productId));
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  // Lidando com array de promises
  const resolvedArr = await Promise.all(promissesArray);
  console.log(resolvedArr);
  const verifyQty = resolvedArr.some((product, index) => body[index].quantity > product.quantity);
  if (verifyQty) {
    throw {
      status: 404,
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    };
  }
  const newSale = await modelSales.insertNewSale({ itensSold: body });
  return newSale;
};

const getSales = async () => {
  const allSales = await modelSales.getSales();
  return allSales;
};

const changeById = async (id, arraySales) => {
  arraySales.map((produto) => (verifyQuantitySales(produto.quantity)));
  const changedSale = await modelSales.changeById(id, arraySales);
  return changedSale;
};

const getSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  const sale = await modelSales.getSale(id);
  console.log(sale);
  if (!sale.sales) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return sale;
};

const deleteSale = async (id) => {
  const deletado = await modelSales.getSale(id);
  console.log(deletado);
  if (!deletado) {
    throw { code: 'invalid_data',
      status: 422,
      message: 'Wrong sale ID format' };
  }
  await modelSales.deleteSale(id);
  return deletado;
};

module.exports = { insertNewSale, getSales, getSale, changeById, deleteSale };
