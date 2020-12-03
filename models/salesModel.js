const { ObjectId } = require('mongodb');

const getCollection = require('./get-collection');

const create = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((res) => ({ _id: res.insertedId, itensSold }));

const getAll = () => getCollection('sales').then((sales) => sales.find().toArray());

const remove = async (id) =>
  getCollection('sales')
    .then((sale) => sale.findOneAndDelete({ _id: ObjectId(id) }))
    .then((removedSale) => ({ _id: removedSale.value.id, itensSold: removedSale.value.itensSold }));

const getById = async (id) => getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));

module.exports = {
  create,
  getById,
  getAll,
  remove,
};
