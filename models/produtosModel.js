// manipulação e definição, estrutura de dados
// todo acesso de dados passa por ela, establece conexão com o BD
const conexao = require('./connection');

const createProduct = async ({ name, quantity }) => {
  await conexao('products').then((produtos) => produtos.insertOne({name, quantity}))
  return { id:product.insertedID, name, quantity };
}

module.exports = createProduct;