const { ObjectId } = require('mongodb');

// const product = require('../Controllers/productsController');

const getCollection = require('./get-connection');

const getAll = async () =>
  getCollection('products').then((product) => product.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((product) => product.findOne(ObjectId(id)));
};

const getByProductName = async ({ name }) =>
  getCollection('products').then((product) => product.findOne({ name }));

const create = async (name, quantity) => {
  getCollection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const update = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products')
    .then((product) => product.updateOne(({ _id: ObjectId(id) }, { $set: { name, quantity } })));
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((db) =>
    db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getByProductName,
};
