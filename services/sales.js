const { salesModel } = require('../models');
const productValidate = require('../utils/productValidate');
const validate = require('../middlewares');

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => salesModel.getSaleById(id);

const create = async (itensSold) => {
  itensSold.forEach((product) => productValidate(product.name, product.quantity, 1));
  const avaliable = await validate(itensSold[0].productId, itensSold[0].quantity);
  return avaliable ? salesModel.registerSale(itensSold) : null;
};

const editSale = async (saleId, saleData) => {
  // console.log(saleData.productId);
  productValidate('itensSold.name', saleData[0].quantity, 1);
  // const avaliable = await validate(saleData[0].productId, saleData[0].quantity);
  return salesModel.editSale(saleId, saleData);
};

const deleteSale = async (saleId) => salesModel.deleteSale(saleId);

module.exports = { getSaleById, getAllSales, create, deleteSale, editSale };
