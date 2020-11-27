const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAll = async () =>
  connection()
    .then((db) => db.collection('sales'))
    .then((products) => products.find().toArray());

const getById = async (id) =>
  connection()
    .then((db) => db.collection('sales'))
    .then((products) => products.findOne(ObjectId(id)));

// const updateById = async (id, name, quantity) =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((products) => products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

// // const deleteById = async (id, name, quantity) =>
// //   connection()
// //     .then((db) => db.collection('products'))
// //     .then((products) => products.deleteOne({ _id: ObjectId(id) }));

// const deleteById = async (id) =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((product) => product.findOneAndDelete({ _id: ObjectId(id) }))
//     .then((excludedProd) => excludedProd.value);

// module.exports = { findProdByName, create, getAll, getById, updateById, deleteById };

module.exports = { create, getAll, getById };
