const { salesModel } = require('../models');
const productValidate = require('../utils/productValidate');

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => salesModel.getSaleById(id);

const create = async (itensSold) => {
  let i = 0;
  while (i < itensSold.length) {
    productValidate(itensSold[i].name, itensSold[i].quantity, 1);
    i += 1;
  }
  return salesModel.registerSale(itensSold);
};

const editSale = async (saleId, saleData) => {
  productValidate('itensSold.name', saleData[0].quantity, 1);
  return salesModel.editSale(saleId, saleData);
};

const deleteSale = async (saleId) => salesModel.deleteSale(saleId);

module.exports = { getSaleById, getAllSales, create, deleteSale, editSale };
