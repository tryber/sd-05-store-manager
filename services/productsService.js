const model = require('../models/productsModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const product = await model.getById(id);

  if (!product) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }

  return product;
};

const create = async (name, quantity) => {
  const registredProduct = await model.getByName(name);

  if (name.length < 5) {
    throw { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }

  if (quantity < 1) {
    throw { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }

  if (typeof quantity === 'string') {
    throw { code: 'invalid_data', message: '"quantity" must be a number' };
  }

  if (registredProduct) {
    throw { code: 'invalid_data', message: 'Product already exists' };
  }

  return model.create(name, quantity);
};

const update = async (id, name, quantity) => {
  const product = await model.getById(id);

  if (!product) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }

  if (name.length < 5) {
    throw { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }

  if (quantity < 1) {
    throw { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }

  if (typeof quantity === 'string') {
    throw { code: 'invalid_data', message: '"quantity" must be a number' };
  }

  return model.update(id, name, quantity);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
