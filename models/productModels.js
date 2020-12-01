const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = (name, quantity) =>
  connection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      quantity,
    }));

const findByName = async (name) =>
  connection('products').then((product) => product.find({ name: { $eq: `${name}` } }).toArray());

const getAll = async () =>
  connection('products')
    .then((products) => products.find().toArray())
    .then((result) => ({
      products: result,
    }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('products').then((products) => products.findOne(ObjectId(id)));
};

const update = (name, quantity, id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('products').then((product) =>
    product.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('products').then((product) =>
    product.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  add,
  findByName,
  getAll,
  findById,
  update,
  exclude,
};
