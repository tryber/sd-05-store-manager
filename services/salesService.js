const model = require('../models/salesModel');

const getAll = async () => model.getAll();

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

const create = async (sales) => {
  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].quantity <= 0) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (typeof sales[i].quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  }
  return model.create(sales);
};

const update = (id, sales) => {
  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].quantity <= 0) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (typeof sales[i].quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  }
  return model.update(id, sales);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
