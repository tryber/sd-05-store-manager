const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const saleById = async (id) => getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));

const venda = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const showAll = async () => getCollection('sales').then((sales) => sales.find().toArray());

const showById = async (id) => getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));

const atualizar = async (id, productId, quantity) =>
  getCollection('sales').then((sales) =>
    sales.updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } }));

const excluir = async (id) =>
  getCollection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  saleById,
  venda,
  showAll,
  showById,
  atualizar,
  excluir,
};
