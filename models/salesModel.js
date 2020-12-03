const { ObjectId } = require('mongodb');
const storeCollection = require('./connection');

const create = async (itensSold) =>
  storeCollection('sales')
    .then((result) => result.insertOne({ itensSold }))
    .then((venda) => ({ _id: venda.insertedId, itensSold }));

const getAll = async () =>
  storeCollection('sales')
    .then((sales) => sales.find().toArray());

const saleById = async (productId) => {
  if (!ObjectId.isValid(productId)) return null;
  return storeCollection('sales').then((sale) => sale.findOne({ _id: ObjectId(productId) }));
};

const update = async (productId, itensSold) => {
  storeCollection('sales')
    .then((venda) => venda.updateOne({ _id: ObjectId(productId) }, { $set: { itensSold } }));
  return { _id: productId, itensSold };
};

const deleteProd = async (productId) => {
  if (!ObjectId.isValid(productId)) return null;
  const deletado = await storeCollection('sales')
    .then((sale) => sale.deleteOne({ _id: ObjectId(productId) }));
  return deletado;
};

module.exports = {
  create,
  getAll,
  update,
  saleById,
  deleteProd,
};
