const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const addProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return { _id: addProduct.insertedId, name, quantity };
};

const getAllProducts = async () => {
  const productList = connection().then((db) => db.collection('products').find({}).toArray());
  return { products: productList };
};

const getProductByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const getProductById = async (id) =>
  connection().then((db) => db.collection('products').findOne({ _id: { $in: [ObjectId(id)] } }));

module.exports = { createProduct, getProductByName, getAllProducts, getProductById };
