const { ObjectId } = require('mongodb');
const getCollection = require('./get-collection');

const create = async (name, quantity) => {
  const product = await getCollection('products').then((collection) => collection.insertOne({ name, quantity }));
  return { _id: product.insertedId, name, quantity };
};

const getByName = async (name) =>
  getCollection('products').then((collection) => collection.findOne({ name }));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('products').then((collection) => collection.findOne(ObjectId(id)));
};

const getAll = async () => getCollection('products').then((collection) => collection.find().toArray());

module.exports = {
  create,
  getByName,
  getById,
  getAll,
};
