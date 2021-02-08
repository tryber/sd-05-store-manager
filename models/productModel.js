// manipulação e definição, estrutura de dados
// todo acesso de dados passa por ela, establece conexão com o BD

const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const productByName = async (name) =>
  getCollection('products').then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertId, name, quantity }));

const atualizar = async (id, name, quantity) =>
  getCollection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

const showById = async (id) =>
  getCollection('products').then((products) => products.findOne(ObjectId(id)));

const showAll = async () => getCollection('products').then((products) => products.find().toArray());

module.exports = {
  create,
  productByName,
  showById,
  showAll,
  atualizar,
};
