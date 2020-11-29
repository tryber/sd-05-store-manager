const { ObjectId } = require('mongodb');
const getCollection = require('./mongo');

const create = async (name, quantity) => {
  const product = await getCollection('products').then((collection) =>
    collection.insertOne({ name, quantity }));
  return { _id: product.insertedId, name, quantity };
};

const findByName = async (name) =>
  getCollection('products').then((collection) => collection.findOne({ name }));

const getAll = async () => getCollection('products').then((product) => product.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('products').then((product) => product.findOne(ObjectId(id)));
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
};
