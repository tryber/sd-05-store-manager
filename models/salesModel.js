const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAll = async () =>
  connection()
    .then((db) => db.collection('sales'))
    .then((sales) => sales.find().toArray());

const getById = async (id) =>
  connection()
    .then((db) => db.collection('sales'))
    .then((sales) => sales.findOne(ObjectId(id)));

const updateById = async (id, productId, quantity) =>
  connection()
    .then((db) => db.collection('sales'))
    // .then((sales) => console.log(sales))
    .then((sales) =>
      sales.updateOne(
        {
          // filtro: devemos achar mesmos id de venda E de produto
          _id: ObjectId(id),
          'itensSold.productId': productId,
          // conforme objeto criado linha 7
        },
        {
          $set: { 'itensSold.0.quantity': quantity },
        },
      ));

const deleteById = async (id) =>
  connection()
    .then((db) => db.collection('sales'))
    .then((sale) => sale.findOneAndDelete({ _id: ObjectId(id) }))
    .then((excludedSale) => excludedSale.value);

module.exports = { create, getAll, getById, updateById, deleteById };
