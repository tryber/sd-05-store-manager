const connection = require('./connection');

const listProducts = async (collection) =>
  connection()
    .then((db) => db.collection(collection).find().toArray());

const addProduct = async (collection, name, quantity) =>
  connection()
    .then((db) => db.collection(collection).insertOne({ name, quantity }));

module.exports = {
  listProducts,
  addProduct,
};
