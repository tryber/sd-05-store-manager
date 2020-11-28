const productModel = require('../models/productModel');

const isValid = async (name, quantity) => {
  const check = await productModel.productExistsByName(name);

  if (!name || name.length < 5) {
    throw { err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
  }
  if (!quantity || quantity <= 0) {
    throw { err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
  }
  if (typeof (quantity) === 'string') {
    throw { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  if (check) {
    throw { err: { code: 'invalid_data', message: 'Product already exists' } };
  }

  return true;
};

const create = async (name, quantity) => productModel.create(name, quantity);

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  if (id.length < 24) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }

  const saida = await productModel.getById(id);
  if (!saida) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  return saida;
};

const update = async (id, name, quantity) => productModel.update(id, name, quantity);

const exclude = async (id) => productModel.exclude(id);

module.exports = {
  isValid,
  create,
  getAll,
  getById,
  update,
  exclude,
};
