const { ObjectId } = require('mongodb');

const getCollection = require('./get-connection');

const getAll = async () =>
  getCollection('sales').then((sale) => sale.find().toArray());

const getById = async (id) =>
  getCollection('sales').then((sale) => sale.findOne(ObjectId(id)));

const getBySale = async ({ productId }) =>
  getCollection('sales').then((sale) => sale.findOne({ productId }));

const create = async (body) => 
  getCollection('sales')
    .then((sale) => sale.insertOne(body))
    .then((result) => {
      result.ops[0]
      console.log(result.ops)
    })

const update = async (id, productId, quantity) => {
  getCollection('sales')
    .then((sale) => sale.updateOne(({ _id: ObjectId(id) }, { $set: { productId, quantity } })));
  return { _id: id, productId, quantity };
};

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
