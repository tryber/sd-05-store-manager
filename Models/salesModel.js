/* const { ObjectId } = require('mongodb');

// const product = require('../Controllers/productsController');

const getCollection = require('./get-connection');

const getAll = async () =>
  getCollection('sales').then((sale) => sale.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((sale) => sale.findOne(ObjectId(id)));
};

const getByproductId = async ({ productId }) =>
  getCollection('sales').then((sale) => sale.findOne({ productId }));

const create = async (productId, quantity) => {
  getCollection('sales')
    .then((sale) => sale.insertOne({ productId, quantity }))
    .then((result) => ({ _id: result.insertedId, productId, quantity }));
};

const update = async ({ id, productId, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales')
    .then((sale) => sale.updateOne(({ _id: ObjectId(id) }, { $set: { productId, quantity } })));
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((db) =>
    db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getByproductId,
};
 */