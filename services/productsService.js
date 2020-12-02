const model = require('../models/productsModel');

const catchError = require('./catchError');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const product = await model.getById(id);
  if (!product) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  return product;
};

const insert = async (name, quantity) => {
  const found = await model.getByName(name);
  if (found) {
    throw { err: { code: 'invalid_data', message: 'Product already exists' } };
  }
  catchError(name, quantity);
  return model.insert(name, quantity);
};

const update = async (id, name, quantity) => {
  catchError(name, quantity);
  const product = await model.update(id, name, quantity);
  if (!product) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  return product;
};

const exclude = async (id) => {
  const product = await model.exclude(id);
  if (!product) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  return product;
};

module.exports = {
  exclude,
  update,
  insert,
  getById,
  getAll,
};
