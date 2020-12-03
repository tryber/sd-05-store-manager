const { ObjectId } = require('mongodb');
const storeCollection = require('./connection');

const create = async (name, quantity) =>
  storeCollection('products')
    .then((result) => result.insertOne({ name, quantity }))
    .then((prod) => ({ _id: prod.insertedId, name, quantity }));

const nameProd = async (name) =>
  storeCollection('products')
    .then((product) => product.findOne({ name }));

const getAll = async () =>
  storeCollection('products')
    .then((product) => product.find().toArray());

const prodById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const prod = await storeCollection('products').then((products) =>
    products.findOne(ObjectId(id)));
  return prod;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const prod = await storeCollection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return prod;
};

const deleteProd = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const prodExcluido = await storeCollection('products').then((product) =>
    product.deleteOne({ _id: ObjectId(id) }));
  return prodExcluido;
};

module.exports = {
  getAll,
  create,
  update,
  nameProd,
  prodById,
  deleteProd,
};
