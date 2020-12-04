const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection('products').then((db) => db.find().toArray());

const getById = async (id) => connection('products').then((db) => db.findOne(ObjectId(id)));

const createProduct = async (name, quantity) =>
  connection('products')
    .then((db) => db.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const updateProduct = async (id, name, quantity) => {
  connection('products').then((db) =>
    db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) =>
  connection('products').then((db) => db.deleteOne({ _id: ObjectId(id) }));

module.exports = { getAll, createProduct, getById, updateProduct, deleteProduct };
