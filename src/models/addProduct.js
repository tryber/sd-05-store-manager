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

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const products = await getCollection('products').then((product) =>
    product.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return products;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
};
