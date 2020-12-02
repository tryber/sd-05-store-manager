const { ObjectId } = require('mongodb');
const sModel = require('../models/salesModel');

const create = async (itensSold) => {
  if (itensSold[0].quantity < 1 || typeof itensSold[0].quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  return sModel.create(itensSold);
};

const getAll = async () => sModel.getAll();

const saleById = async (id) => {
  const sale = await sModel.saleById(id);
  if (!ObjectId.isValid(id) || sale === null) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return sale;
};

module.exports = {
  create,
  getAll,
  saleById,
};
