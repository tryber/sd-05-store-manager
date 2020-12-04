const { ObjectId } = require('mongodb');

const model = require('../models/sales');

/* const getAll = async () => model.getAll();

const getSales = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const item = await model.getById(id);
  if (!item) throw { err: { code: 'invalid_data', message: 'Wrong id format' } };

  return item;
}; */

const create = async (body) => {
  body.forEach(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) {
      console.log(productId);
      throw { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
    if (typeof quantity === 'string' || quantity <= 0) {
      throw { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
  });
  return model.createSale(body);
};

/* const update = async (id, name, quantity) => {
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

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const item = await model.getById(id);
  if (!item) throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  return model.deleteProduct(id);
};
 */
module.exports = { /* getAll, getSales, remove, update, */ create };
