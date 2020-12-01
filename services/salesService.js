const { ObjectId } = require('mongodb');
const model = require('../model/salesModel');

const checkItens = (itensSold) =>
  itensSold.some((item) => {
    if (!ObjectId.isValid(item.productId)) {
      console.log('entrei aqui');
      return true;
    }
    if (item.quantity < 1 || typeof item.quantity !== 'number') {
      return true;
    }
    return false;
  });

const create = async (itensSold) => {
  const check = await checkItens(itensSold);
  if (check) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  const newProduct = await model.create(itensSold);
  return newProduct;
};

const getAll = async () => model.getAll();

const getById = async (id) => {
  const sale = await model.getById(id);
  if (!ObjectId.isValid(id) || sale === null) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return sale;
};

const update = async (id, itensSold) => {
  const check = await checkItens(itensSold);
  if (check) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  return model.update(id, itensSold);
};

const remove = async (id) => {
  const deletedSale = await model.remove(id);

  if (!deletedSale) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  return deletedSale;
};

module.exports = {
  create,
  getAll,
  update,
  remove,
  getById,
};
