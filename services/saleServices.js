const { ObjectId } = require('mongodb');
const model = require('../models/salesModel');

const getAll = async () => model.getAllSales();

const getById = async (id) => {
  if (!id) {
    throw {
      code: 'not_found', message: 'Sale not found',
    };
  }
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found', message: 'Sale not found',
    };
  }

  const sales = await model.getSalesById(id);

  if (!sales) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sales;
};

const create = async (itemsSold) => {
  if (!itemsSold.productId || !itemsSold.quantity) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (itemsSold.quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!ObjectId.isValid(itemsSold.productId)) {
    throw {
      code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
    };
  }
  if (typeof itemsSold.quantity !== 'number' || !Number.isInteger(itemsSold.quantity)) {
    throw {
      code: 'invalid_data',
      message: '"Wrong product ID or invalid quantity',
    };
  }
  const saleExists = await model.getSalesById(id);
  if (saleExists) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const newProduct = await model.createProducts(itemsSold);

  return newProduct;
};

const update = async (id, itemsSold) => {
  if (!id) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!itemsSold) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!itemsSold.productId || !itemsSold.quantity) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (itemsSold.quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (!ObjectId.isValid(itemsSold.productId)) {
    throw {
      code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
    };
  }
  if (typeof itemsSold.quantity !== 'number' || !Number.isInteger(itemsSold.quantity)) {
    throw {
      code: 'invalid_data',
      message: '"Wrong product ID or invalid quantity',
    };
  }
  model.updateProducts(id, itemsSold);

  return { id, itemsSold };
};

const exclude = async (id) => {
  if (!id) {
    throw {
      code: 'invalid_data', message: 'Wrong sale ID format',
    };
  }
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data', message: 'Wrong sale ID format'
    };
  }

  const { _id, itemsSold } = await model.getSalesById(id);

  if (!id || !itemsSold) {
    throw {
      code: 'invalid_data', message: 'Wrong sale ID format'
    };
  }

  await model.excludeProducts(id);

  return { _id, itemsSold };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
