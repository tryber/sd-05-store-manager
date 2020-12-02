const { ObjectId } = require('mongodb');

const product = require('../Controllers/productsController');

const getCollection = require('./get-connection');

const getAll = async () =>
  getCollection('product').then((product) => product.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('product').then((product) => product.findOne(ObjectId(id)));
};

const getByProductName = async ({ name }) => {
  return getCollection('product').then((product) => product.findOne({ name }));
};

const create = async (name, quantity) => {
  getCollection('product')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const update = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('product')
    .then((product) => product.updateOne(({ _id: ObjectId(id) }, { $set: { name, quantity } })));
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((db) => {
    return db.deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getByProductName,
};
