const { ObjectId } = require('mongodb');
const connection = require('./connection');

const listProducts = async (collection) =>
  connection()
    .then((db) => db.collection(collection).find().toArray());

const addProduct = async (collection, name, quantity) =>
  connection()
    .then((db) => db.collection(collection).insertOne({ name, quantity }));

const getProductById = async (collection, id) =>
  connection().then(async (db) => {
    const product = await db.collection(collection).findOne({ _id: ObjectId(id) });
    if (!product) {
      return null;
    }
    return product;
  });

const deleteProductById = async (collection, id) =>
  connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  listProducts,
  addProduct,
  getProductById,
  deleteProductById,
};
