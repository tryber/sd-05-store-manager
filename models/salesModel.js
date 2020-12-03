const { ObjectId } = require('mongodb');

const getCollection = require('./get-collection');

const create = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((res) => ({ _id: res.insertedId, itensSold }));

const getAll = () => getCollection('sales').then((sales) => sales.find().toArray());

const remove = async (id) =>
  getCollection('sales')
    .then((sale) => sale.findOneAndDelete({ _id: ObjectId(id) }))
    .then((removedSale) => ({ _id: removedSale.value.id, itensSold: removedSale.value.itensSold }));

const getById = async (id) => getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));

//prettier-ignore
const updateSale = async (sales, id) => {
  if (!ObjectId.isValid(id)) return null;
  getCollection('sales').then((sale) =>
    sale.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } }));
};

module.exports = {
  create,
  getById,
  getAll,
  updateSale,
  remove,
};
