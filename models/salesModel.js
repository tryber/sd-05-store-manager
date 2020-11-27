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

const updateById = async (id, productId, quantity) =>
  connection()
    .then((db) => db.collection('sales'))
    // .then((products) => console.log(products))
    .then((products) =>
      products.updateOne(
        {
          // filtro: devemos achar mesmos id de venda E de produto
          _id: ObjectId(id),
          'itensSold.productId': productId,
          // conforme objeto criado linha 7
        },
        {
          $set: { 'itensSold.0.quantity': quantity },
        },
      ),
    );

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

module.exports = { create, getAll, getById, updateById };
