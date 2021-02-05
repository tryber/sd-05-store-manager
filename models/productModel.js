// manipulação e definição, estrutura de dados
// todo acesso de dados passa por ela, establece conexão com o BD

const getCollection = require('./connection');

const productByName = async (name) =>
  getCollection('products').then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertId, name, quantity }));

module.exports = {
  create,
  productByName,
};
