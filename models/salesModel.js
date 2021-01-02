const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const findSaleById = async (id) =>
  getCollection('sales')
    .then((sales) => sales.findOne(ObjectId(id)));

const insertSale = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

module.exports = {
  findSaleById,
  insertSale,
};
