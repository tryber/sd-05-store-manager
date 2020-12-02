// const { ObjectId } = require('mongodb');

const getCollection = require('./get-collection');

const create = async (items) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ items }))
    .then((res) => ({ _id: res.insertedId, itensSold: items }));

// const findByName = async (name) =>
// getCollection('sales').then((sales) => sales.findOne({ name }));

// const getAll = async () =>
// getCollection('sales').then((sales) => sales.find().toArray());

// const getById = async (id) =>
// getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));

// // prettier-ignore
// const updateById = async (id, quantity) =>
//   getCollection('sales').then((sales) =>
//     sales.updateOne({ _id: ObjectId(id) }, { $set: { quantity } }));

// const remove = async (id) =>
//   getCollection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  // create,
  // findByName,
  // getAll,
  // getById,
  // remove,
  // updateById,
};
