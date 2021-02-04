const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertSale = async (sales) =>
  getConnection()
    .then((db) => db.collection('sales').insertOne({ itemSold: sales }))
    .then((result) => ({ _id: result.insertedId, itensSold: sales }))
    .catch((err) => console.log(err));

const checkStock = (quantity) =>
  getConnection()
    .then((db) => db.collection('products').update({ $inc: quantity }))
    .catch((err) => console.log(err));

const findAllSales = async () =>
  getConnection()
    .then((db) => db.collection('sales').find({}).toArray())
    .catch((err) => console.log(err));

const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

const updateSale = async (id, productId, quantity) =>
  getConnection()
    .then((db) =>
      db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } }))
    .catch((err) => console.log(err));

const deleteSale = async (id) =>
  getConnection()
    .then((db) => db.collection('sales').deleteOne({ _id: Object(id) }))
    .catch((err) => console.log(err));

module.exports = {
  insertSale,
  checkStock,
  findAllSales,
  findById,
  updateSale,
  deleteSale,
};
