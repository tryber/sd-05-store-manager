const { ObjectId } = require('mongodb');

const model = require('../models/sales');

const getAll = async () => model.getAll();

const getSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'not_found', message: 'Sale not found' } };
  }
  const item = await model.getById(id);
  console.log('id ===>', item);
  if (!item) throw { err: { code: 'not_found', message: 'Sale not found' } };

  return item;
};

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

const update = async (id, body) => {
  body.forEach(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) {
      console.log(productId);
      throw { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
    if (typeof quantity === 'string' || quantity <= 0) {
      throw { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
  });

  return model.updateSale(id, body);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }
  const item = await model.getById(id);
  if (!item) throw { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  return model.deleteSale(id);
};

module.exports = { getAll, getSale, remove, update, create };
