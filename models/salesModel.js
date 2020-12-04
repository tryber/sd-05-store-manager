const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productsModel = require('./productsModel');

const findByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const createSale = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const findAllSale = async () => {
  connection()
    .then((db) => db.collection('sales').find().toArray());
};

const saleUpdate = async (id, product) =>
  connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: product } },
));

const deleteSale = async (id) =>
  connection()
    .then((db) => db.collection('sales')
    .then((sale) => sale.findOneAndDelete({ _id: ObjectId(id) }))
    .then((delSale) => delSale.value);

module.exports = {
  findByIdSale,
  createSale,
  findAllSale,
  deleteSale,
  saleUpdate,
};
