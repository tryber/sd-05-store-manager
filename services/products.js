const { ObjectId } = require('mongodb');

const model = require('../models/products');

const getAll = async () => model.getAll();

const getProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const item = await model.getById(id);
  if (!item) throw { err: { code: 'invalid_data', message: 'Wrong id format' } };

  return item;
};

const create = async (name, quantity) => {
  if (name.length < 5) {
    console.log(name);
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (typeof quantity === 'string') {
    throw { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  if (quantity <= 0) {
    throw {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  const allproduct = await getAll();
  if (allproduct.map((e) => e.name).includes(name)) {
    throw { err: { code: 'invalid_data', message: 'Product already exists' } };
  }

  return model.createProduct(name, quantity);
};

const update = async (id, name, quantity) => {
  if (name.length < 5) {
    console.log(name);
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (typeof quantity === 'string') {
    throw { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  if (quantity <= 0) {
    throw {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  return model.updateProduct(id, name, quantity);
};

const remove = async (_id) => model.deleteProduct(_id);

module.exports = { getAll, getProduct, remove, update, create };
