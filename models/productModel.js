const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const addProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return { _id: addProduct.insertedId, name, quantity };
};

const getAllProducts = async () => {
  const productList = await connection().then((db) => db.collection('products').find({}).toArray());
  return productList;
};

const getProductByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const getProductById = async (id) =>
  connection().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

const updateProduct = async (id, name, quantity) => {
  await connection().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return { _id: id, name, quantity };
};

const deleteProduct = async (id) =>
  connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
