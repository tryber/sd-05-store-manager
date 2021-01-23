// acesso ao banco

// const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');
const products = require('./products');

const salesCreate = async (itensSold) => connectionDB('sales')
  .then((db) => db.insertOne({ batatinha: itensSold }))
  .then((result) => ({
    _id: result.insertedId,
    itensSold,
  }));

module.exports = { salesCreate };
