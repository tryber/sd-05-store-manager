const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const findSaleById = async (id) =>
  getCollection('sales')
    .then((sales) => sales.findOne(ObjectId(id)));

const insertSale = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAll = async () =>
  getCollection('sales')
    .then((sales) => sales.find().toArray());

const getById = async (id) =>
  getCollection('sales')
    .then((sales) => sales.findOne(ObjectId(id)));

const update = async (id, productId, quantity) =>
  getCollection('sales')
    .then((sales) =>
      sales.updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } }));

module.exports = {
  findSaleById,
  insertSale,
  getAll,
  getById,
  update,
};
