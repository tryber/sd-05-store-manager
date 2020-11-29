const { ObjectId } = require('mongodb');

const getCollection = require('./get-collection');

const create = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertId, name, quantity }));

const findByName = async (name) =>
  getCollection('products').then((products) => products.findOne({ name }));

const getAll = async () => getCollection('products').then((products) => products.find().toArray());

// const getById = async (id) =>
//   getCollection('products').then((products) => products.findOne(ObjectId(id)));

const findById = async (id) => getCollection('products').then((res) => res.findOne(ObjectId(id)));

// prettier-ignore
const updateById = async (id, name, quantity) =>
  getCollection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

const remove = async (id) =>
  getCollection('products').then((products) => products.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  findById,
  findByName,
  getAll,
  // getById,
  remove,
  updateById,
};
