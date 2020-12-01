const { ObjectId } = require('mongodb');
const getCollection = require('./get-collection');

const create = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAll = async () => {
  const productList = await getCollection('sales').then((sales) => sales.find().toArray());
  return productList;
};

const getById = async (productId) => {
  if (!ObjectId.isValid(productId)) return null;
  return getCollection('sales').then((sale) => sale.findOne({ _id: ObjectId(productId) }));
};

const update = async (productId, itensSold) => {
  getCollection('sales').then((sale) =>
    sale.updateOne({ _id: ObjectId(productId) }, { $set: { itensSold } }));
  return { _id: productId, itensSold };
};

const remove = async (productId) => {
  if (!ObjectId.isValid(productId)) return null;
  const deletedSale = await getCollection('sales').then((sale) =>
    sale.deleteOne({ _id: ObjectId(productId) }));
  return deletedSale;
};

module.exports = {
  create,
  getAll,
  update,
  remove,
  getById,
};
