// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const addProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return { _id: addProduct.insertedId, name, quantity };
};

const getProductByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

module.exports = { createProduct, getProductByName };
