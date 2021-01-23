// acesso ao banco

// const { ObjectID } = require('mongodb');
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
  .then((db) => db.find({ _id: id }));

module.exports = { salesCreate, listSales, getSaleById };
