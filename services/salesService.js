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
  const newArray = await model.insert(array);
  console.log(newArray);
  return newArray;
};

module.exports = {
  getAll,
  getById,
  insert,
};
