const { ObjectId } = require('mongodb');
const getCollection = require('./mongo');

const create = async (products) =>
  getCollection('sales')
    .then((product) => product.insertOne({ itensSold: products }))
    .then((result) => ({ _id: result.insertedId, itensSold: products }));

const getAll = async () => getCollection('sales').then((sales) => sales.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('sales').then((product) => product.findOne(ObjectId(id)));
};

module.exports = {
  create,
  getAll,
  getById,
};
