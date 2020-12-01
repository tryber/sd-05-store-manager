const products = require('../controllers/productsController');
const model = require('../models/productsModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const product = await model.getById(id);

  if (product) {
    throw { code: 'not_found', message: `Product with ID ${id} was not found.` };
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

module.exports = {
  getAll,
  getById,
  create,
};
