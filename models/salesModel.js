const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createSales = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => result.ops[0]);

const AllSales = async () =>
  getCollection('sales')
    .then((sales) => sales.find().toArray());

const findIdSale = async (id) =>
  getCollection('sales')
    .then((sale) => sale.findOne(ObjectId(id)));

module.exports = {
  createSales,
  AllSales,
  findIdSale,
};
