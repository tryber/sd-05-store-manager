const { ObjectId } = require('mongodb');
const getCollection = require('./get-Collection');

const addSale = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

module.exports = { addSale };
