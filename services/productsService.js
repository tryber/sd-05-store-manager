const { ObjectId } = require('mongodb');
const prodModel = require('../models/productsModel');
// O Service faz as regras de negócio e todas funções de apoio chamadas no Controller.
// As funções aqui chamam as funções do Model para efetivar as mudanças no BD.

const isValid = async (name, quantity) => {
  const nameInDB = await prodModel.findProdByName(name);
  if (nameInDB) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
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
  const validProduct = await isValid(name, quantity);
  if (!validProduct) return false;
  const newProduct = await prodModel.create(name, quantity);
  return newProduct;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  const productById = await prodModel.getById(id);
  if (!productById) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return productById;
};

module.exports = { create, getById };
