const { ObjectId } = require('mongodb');
const getCollection = require('./get-collection');

const create = async (sales) => {
  const sale = await getCollection('sales').then((collection) => collection.insertOne({
    itensSold: sales,
  }));
  return {
    _id: sale.insertedId,
    itensSold: sales,
  };
};

const update = async (id, sales) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('sales').then((collection) =>
    collection.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } }));
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('sales').then((collection) => collection.findOne(ObjectId(id)));
};

const getAll = async () =>
  getCollection('sales').then((collection) => collection.find().toArray());

module.exports = {
  create,
  getById,
  getAll,
  update,
};
