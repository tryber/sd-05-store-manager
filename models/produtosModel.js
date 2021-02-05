// manipulação e definição, estrutura de dados
// todo acesso de dados passa por ela, establece conexão com o BD
const conexao = require('./connection');

const create = async (name, quantity) => {
  const productNew = await conexao('products').then((products) =>
    products.insertOne({ name, quantity }));
  return { _id: productNew.insertedID, name, quantity };
};

const getProducts = async (name) => {
  const product = await conexao('products').then((products) => products.findOne({ name }));
  return product;
};

module.exports = {
  create,
  getProducts,
};
