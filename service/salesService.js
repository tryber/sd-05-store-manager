const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const createSales = async (itensSold) => {
  itensSold.forEach((element) => {
    if (element.quantity < 1) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
    if (!Number.isInteger(element.quantity)) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });
  return salesModel.createSales(itensSold);
};

const AllSales = async () => salesModel.AllSales();

const findIdSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return salesModel.findIdSale(id);
};

module.exports = {
  createSales,
  AllSales,
  findIdSale,
};
