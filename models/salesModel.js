const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const getAll = async () => getCollection('sales').then((sales) => sales.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((sale) => sale.findOne(ObjectId(id)));
};

const create = async (itensSold) =>
  getCollection('sales')
    .then((sale) => sale.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((collection) => collection.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
