const laConexion = require('./connection');

const createProduct = async ({name, quantity}) => {
  const product = await laConexion('products').then((produtos) => produtos.insertOne({name, quantity}))
  return { id:product.insertedId, name, quantity};
}

module.exports = createProduct;
