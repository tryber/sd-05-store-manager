// acesso ao banco

const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const productCreate = async (name, quantity) => connectionDB('products')
  .then((db) => db.insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const getAllProducts = async () => connectionDB('products')
  .then((db) => db.find().toArray());

const getByNameProducts = async (name) => connectionDB('products')
  .then((db) => db.findOne({ name }));

const getProductById = async (id) => connectionDB('products')
  .then((db) => db.findOne(ObjectID(id)));

const deleteProduct = async (id) => connectionDB('products')
  .then((db) => db.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  getAllProducts,
  productCreate,
  getByNameProducts,
  getProductById,
  deleteProduct };
