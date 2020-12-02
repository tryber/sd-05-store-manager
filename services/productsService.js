const { ObjectId } = require('mongodb');
const pModel = require('../models/productsModel');

const validation = async (name, quantity) => {
  if (typeof name !== 'string') {
    throw {
      code: 'invalid_data',
      message: 'product name must be a string',
    };
  }
  if (name.length <= 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  return true;
};

const create = async (name, quantity) => {
  const produtoOk = await validation(name, quantity);
  if (!produtoOk) {
    return false;
  }
  const nomeProd = await pModel.nameProd(name);
  if (nomeProd) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  const novoProd = await pModel.create(name, quantity);
  return novoProd;
};

const getAll = async () => pModel.getAll();

const prodById = async (id) => {
  const data = await pModel.prodById(id);
  if (!data) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return data;
};

const update = async (id, name, quantity) => {
  const produtoOk = await validation(name, quantity);
  if (!produtoOk) return false;
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  await pModel.update(id, name, quantity);
  return { _id: ObjectId(id), name, quantity };
};

const deleteProd = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  const prodExcluido = await pModel.deleteProd(id);
  if (!prodExcluido) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return prodExcluido;
};

module.exports = {
  create,
  getAll,
  update,
  prodById,
  deleteProd,
};
