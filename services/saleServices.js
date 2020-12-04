// saleServices
// const rescue = require('express-rescue');
const salesModels = require('../models/salesModels');

const createSale = async (itensSold) => salesModels.create(itensSold);

const getAllSales = async () => salesModels.getAll();

const getSoldById = async (id) => salesModels.getById(id);

module.exports = {
  createSale,
  getAllSales,
  getSoldById,
};
