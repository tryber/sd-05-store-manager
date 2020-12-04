// const { ObjectId } = require('mongodb');
const connection = require('./connection');

/* const getAll = async () => connection('products').then((db) => db.find().toArray());

const getById = async (id) => connection('products').then((db) => db.findOne(ObjectId(id)));
 */
const createSale = async (itensSold) =>
  connection('sales')
    .then((db) => db.insertOne({ itensSold }))
    .then((result) => result.ops[0]);
/*
const updateProduct = async (id, name, quantity) => {
  connection('products').then((db) =>
    db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) =>
  connection('products').then((db) => db.deleteOne({ _id: ObjectId(id) }));
 */
module.exports = { /* getAll, */ createSale /* , getById, updateProduct, deleteProduct */ };
