const { ObjectId } = require('mongodb');
const connection = require('./connection');
const getCollection = require('./connection');

const getAllProducts = async () => {
  const result = await getCollection('products').then((products) => products.find().toArray());
  return result;
};

const getProductByName = async (name) => {
  const result = await getCollection('products').then((products) => products.findOne({ name }));
  return result;
};

const getProductById = async (id) =>
  getCollection('products').then((products) => products.findOne(ObjectId(id)));

const createProduct = async ({ name, quantity }) => {
  const product = await connection('products').then((products) =>
    products.insertOne({ name, quantity }));
  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  await getCollection('products').then((products) =>
    products.updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    ));
};

const deleteAProduct = async (id) => {
  await getCollection('products').then((products) => products.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteAProduct,
  getProductById,
  getProductByName,
};
