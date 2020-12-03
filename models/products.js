const { ObjectId } = require('mongodb');
const { idText } = require('typescript');
const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) =>
      products.map(({ _id, name, quantity }) => ({
        _id,
        name,
        quantity,
      })));

const getById = async (id) =>
  connection()
    .then((db) => db.collection('products').find(ObjectId(id)));

const pushProduct = async (name, quantity) =>
  connection().then((db) => db.collection('products')
    .insertOne({ name, quantity }))
    .then((result) => result);

const updateProduct = async ({ _id }) => connection()
  .then((db) => db.collection('products').updateOne(ObjectId(_id)));

module.exports = { getAll, pushProduct, getById, updateProduct };
