const model = require('../models/index');

const createProduct = async (name, quantity) => {
  const doesItExists = await model.product.findByName(name).then((result) => {
    if (result.length === 0) {
      return false;
    }
    return true;
  });

  switch (true) {
    case doesItExists:
      throw {
        code: 'invalid_data',
        message: 'Product already exists',
      };
    case name.length < 5:
      throw {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      };
    case +quantity < 1:
      throw {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      };
    case typeof quantity !== 'number':
      throw {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      };
    default:
      return model.product.add(name, quantity);
  }
};

const showProducts = async () =>
  model.product.getAll();

const showProduct = async (id) => {
  const product = await model.product.findById(id);
  switch (true) {
    case product === null || product === {}:
      throw {
        code: 'invalid_data',
        message: 'Wrong id format',
      };
    default:
      return product;
  }
};

const updateById = async (name, quantity, id) => {
  const product = await model.product.findById(id);

  switch (true) {
    case product === null || product === {}:
      throw {
        code: 'invalid_data',
        message: 'Wrong id format',
      };
    case name.length < 5:
      throw {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      };
    case +quantity < 1:
      throw {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      };
    case typeof quantity !== 'number':
      throw {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      };
    default:
      return model.product.update(name, quantity, id);
  }
};

const excludeById = async (id) => model.product.exclude(id);

module.exports = {
  createProduct,
  showProducts,
  showProduct,
  updateById,
  excludeById,
};
