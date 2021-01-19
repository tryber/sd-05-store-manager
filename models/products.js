const conexao = require('./connection');

const createProduct = async ({ name, quantity }) => {
  await conexao('products').then((produtos) => produtos.insertOne({name, quantity}))
  return { id:product.insertedID, name, quantity };
}

module.exports = createProduct;