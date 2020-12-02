const model = require('../models/sales');

const create = async (salesField) => {
  if (salesField[0].quantity < 1 || typeof salesField[0].quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  return model.create(salesField);
};

const getAll = async () => {
  const sales = await model.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await model.getById(id);
  if (!sale) {
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
  getById,
};
