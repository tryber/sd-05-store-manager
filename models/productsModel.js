const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const findProductByName = async (name) =>
  getCollection('products')
    .then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const update = async (id, name, quantity) =>
  getCollection('products')
    .then((products) => products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

const getAll = async () =>
  getCollection('products')
    .then((products) => products.find().toArray());

const getById = async (id) =>
  getCollection('products')
    .then((products) => products.findOne(ObjectId(id)));

module.exports = {
  create,
  findProductByName,
  getAll,
  getById,
  update,
};
