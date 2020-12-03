const { ObjectId } = require('mongodb');

const saleModel = require('../models/salesModel');

const productService = require('./productsService');

const productModel = require('../models/productsModel');

const validationData = (item) => {
  if (item.quantity < 1 || typeof item.quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
};

const doesSaleExist = async (saleDoesExist) => {
  console.log(`saleDoesExist: ${saleDoesExist}`);
  if (!saleDoesExist) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
};

const isThisIdValid = (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
};

const create = async (items) => {
  await productService.updateDB(items);
  items.forEach((item) => validationData(item));
  const itemsSold = saleModel.create(items);
  return itemsSold;
};

const getAll = async () => {
  const allSales = await saleModel.getAll();
  return allSales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  const sale = await saleModel.getById(id);

  if (!sale) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sale;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
  const removedSale = await saleModel.remove(id);
  if (!removedSale) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  return removedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
