const { ObjectId } = require('mongodb');
const storeCollection = require('./connection');

const create = async (itensSold) =>
  storeCollection('sales')
    .then((result) => result.insertOne({ itensSold }))
    .then((venda) => ({ _id: venda.insertedId, itensSold }));

const getAll = async () =>
  storeCollection('sales')
    .then((sales) => sales.find().toArray());

const saleById = async (productId) => {
  if (!ObjectId.isValid(productId)) return null;
  return storeCollection('sales').then((sale) => sale.findOne({ _id: ObjectId(productId) }));
};

module.exports = {
  create,
  getAll,
  saleById,
};
