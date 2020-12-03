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

const verificaProd = (itensSold) =>
  itensSold.some((item) => {
    if (!ObjectId.isValid(item.productId)) {
      return true;
    }
    if (item.quantity < 1 || typeof item.quantity !== 'number') {
      return true;
    }
    return false;
  });

const update = async (id, itensSold) => {
  const verItens = await verificaProd(itensSold);
  if (verItens) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  return sModel.update(id, itensSold);
};

const deleteProd = async (id) => {
  const deletado = await sModel.deleteProd(id);

  if (!deletado) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  return deletado;
};

module.exports = {
  create,
  getAll,
  update,
  saleById,
  deleteProd,
};
