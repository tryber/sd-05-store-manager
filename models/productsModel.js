const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllProducts = async () =>
  getCollection('products').then((products) => products.find().toArray());

const getProductsById = async (id) =>
  getCollection('products').then((db) => db.findOne(ObjectId(id)));
// if (!ObjectId.isValid(id)) return null;

const getProductByName = async (name) => getCollection('products')
  .then((products) => products.findOne({ name }));

const createProducts = async (name, quantity) => {
  const product = await getCollection('products')
    .then((db) => db.insertOne({ name, quantity }));
  return { _id: product.insertedId, name, quantity };
};

const updateProducts = async ({ id, name, quantity }) => {
  // if (!ObjectId.isValid(id)) return null;

  const product = await getCollection('products')
    .then((products) => products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return product;
};

const excludeProducts = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((db) => db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductByName,
  createProducts,
  updateProducts,
  excludeProducts,
};
