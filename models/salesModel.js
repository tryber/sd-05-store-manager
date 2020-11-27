const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getProductById = async (id) =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((products) => products.findOne(ObjectId(id)));

const create = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

// const create = async (productId, quantity) =>
//   connection()
//     .then((db) => db.collection('products').insertOne({ productId, quantity }))
//     .then((result) => ({
//       _id: result.insertedId,
//       itensSold: [
//         {
//           productId,
//           quantity,
//         },
//       ],
//     }));

// const getAll = async () =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((products) => products.find().toArray());

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

module.exports = { create };
