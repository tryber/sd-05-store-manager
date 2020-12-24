const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const findSaleById = async (id) =>
  getCollection('sales')
    .then((sales) => sales.findOne(ObjectId(id)));

const insertSale = async (...ItensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ ItensSold }))
    .then((result) => ({ _id: result.insertedId, ...ItensSold }));

module.exports = {
  findSaleById,
  insertSale,
};
