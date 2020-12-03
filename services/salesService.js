const { ObjectId } = require('mongodb');

const saleModel = require('../models/salesModel');

const productService = require('./productsService');

const validationData = (item) => {
  if (item.quantity < 1 || typeof item.quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
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
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const sale = await saleModel.getById(id);
  console.log(sale);
  if (!sale) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sale;
};

const updateSale = async (sales, id) => {
  sales.forEach(({ quantity }) => {
    if (+quantity < 1 || typeof quantity !== 'number') {
      console.log(`${quantity} is not a valid quantity`);
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });
  // };
  // if (!ObjectId.isValid(id)) {
  //   console.log(`${id} is not a valid Id`);
  //   throw {
  //     code: 'invalid_data',
  //     message: 'Wrong product ID or invalid quantity',
  //   };
  // }

  return saleModel.updateSale(sales, id);
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
  updateSale,
  remove,
};
