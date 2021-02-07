// Consultado repo sd-05-live-lectures para estrutura getAll e ById

const { ObjectId } = require('mongodb');

const getCollection = require('./get-connection');

const getAll = async () => getCollection('products').then((products) => products.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('products').then((db) => db.findOne(ObjectId(id)));
};

const getByProductName = async ({ name }) =>
  getCollection('products').then((products) => products.findOne({ name }));

const create = async (name, quantity) => {
  const products = await getCollection('products').then((db) => db.insertOne({ name, quantity }));
  return { _id: products.insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  await getCollection('products').then((product) =>
    product.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return { _id: ObjectId(id), name, quantity };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((db) => db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  getByProductName,
  create,
  update,
  exclude,
};
