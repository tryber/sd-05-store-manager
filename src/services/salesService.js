const { ObjectId } = require('mongodb');
const sales = require('../models/sales');
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
  const salesLint = await model.getAll();
  return salesLint;
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

const update = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  if (quantity < 1 || typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  await sales.update(id, productId, quantity);

  return {
    _id: id,
    itensSold: [
      {
        productId,
        quantity,
      },
    ],
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
