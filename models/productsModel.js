const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const getAll = async () => getCollection('products').then((products) => products.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((products) => products.findOne(ObjectId(id)));
};

const getByName = async (name) => getCollection('products')
  .then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  getCollection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
};

const remove = async (id) =>
  getCollection('products')
    .then((product) => product.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  getById,
  create,
  getByName,
  update,
  remove,
};
