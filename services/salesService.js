const model = require('../models/salesModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const sale = await model.getById(id);

  if (!sale) {
    throw { code: 'not_found', message: 'Sale not found' };
  }

  return sale;
};

const create = async (itensSold) => {
  itensSold.forEach((item) => {
    if (item.quantity < 1) {
      throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    }

    if (typeof item.quantity === 'string') {
      throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    }
  });

  return model.create(itensSold);
};

module.exports = {
  getAll,
  getById,
  create,
};
