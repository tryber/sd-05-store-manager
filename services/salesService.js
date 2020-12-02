const model = require('../models/salesModel');

const catchError = require('./catchError2');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const sale = await model.getById(id);
  if (!sale) {
    throw { err: { code: 'not_found', message: 'Sale not found' } };
  }
  return sale;
};

const insert = async (array) => {
  array.forEach((element) => catchError(element.quantity));
  return model.insert(array);
};

const update = async (id, array) => {
  array.forEach((element) => catchError(element.quantity));
  const product = await model.update(id, array);
  if (!product) {
    throw { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }
  return product;
};

const exclude = async (id) => {
  const product = await model.exclude(id);
  if (!product) {
    throw { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }
  return product;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  exclude,
};
