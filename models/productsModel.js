const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const create = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findName = async (name) =>
  getCollection('products')
    .then((product) => product.findOne({ name }));

const AllProducts = async () =>
  getCollection('products')
    .then((products) => products.find().toArray());

const findId = async (id) =>
  getCollection('products')
    .then((product) => product.findOne(ObjectId(id)));

const updateProduct = async (id, name, quantity) => {
  getCollection('products')
    .then((product) => product.updateOne(
      { _id: { $in: [ObjectId(id)] } },
      { $set: { name, quantity } },
    ));
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) =>
  getCollection('products')
    .then((product) => product.deleteOne({ _id: ObjectId(id) }));

const updateSales = async (productId, quantity) => {
  const id = ObjectId(productId);
  getCollection('products')
    .then((product) => product.updateOne(
      { _id: id },
      { $set: { quantity: -quantity } },
    ));
  return { _id: id, quantity };
};

module.exports = {
  create,
  findName,
  AllProducts,
  findId,
  updateProduct,
  deleteProduct,
  updateSales,
};
