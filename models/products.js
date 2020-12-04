const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection('products').then((db) => db.find().toArray());

const getById = async (id) => await connection('products').then((db) => db.findOne(ObjectId(id)));

const createProduct = async (name, quantity) =>
  connection('products')
    .then((db) => db.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const updateProduct = async (_id, name, quantity) =>
  connection('products').then((db) => db.updateOne(ObjectId(_id)));

const deleteProduct = async ({ _id }) =>
  connection('products').then((db) => db.deleteOne({ _id: ObjectId(_id) }));

module.exports = { getAll, createProduct, getById, updateProduct, deleteProduct };
