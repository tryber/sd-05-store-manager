// acesso ao banco

const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');

const salesCreate = async (itensSold) => connectionDB('sales')
  .then((db) => db.insertOne({ itensSold }))
  .then((result) => ({
    _id: result.insertedId,
    itensSold,
  }));

const listSales = async () => connectionDB('sales')
  .then((db) => db.find({}).toArray())
  .then((result) => ({
    sales: result,
  }));

const getSaleById = async (id) => connectionDB('sales')
  .then((db) => db.findOne({ _id: ObjectID(id) }));

const editSale = async (id, itensSold) => connectionDB('sales')
  .then((db) => db.updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }));

module.exports = { salesCreate, listSales, getSaleById, editSale };
