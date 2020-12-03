const { ObjectId } = require('mongodb');

const getCollection = require('./get-connection');

const getAll = async (body) =>
  getCollection('sales')
    .then((sale) => sale.find().toArray({ body }));

const getById = async (id) =>
  getCollection('sales').then((sale) => sale.findOne(ObjectId(id)));

const getBySale = async ({ productId }) =>
  getCollection('sales').then((sale) => sale.findOne({ productId }));

const create = async (body) =>
  getCollection('sales')
    .then((sale) => sale.insertOne({ itensSold: body }))
    .then((result) => result.ops[0]);

const update = async (id, body) =>
  getCollection('sales')
    .then((sale) => sale.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: body } }))
    .then(() => ({ _id: id, itensSold: body }));

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((db) =>
    db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getBySale,
};
