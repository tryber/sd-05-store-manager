const getCollection = require('./connection');

const create = async (name, quantity) => {
  const createProduct = await getCollection('products')
    .then((products) => products.insertOne({ name, quantity }));

  return { _id: createProduct.insertedId, name, quantity };
};

const getProduct = async (name) => {
  const product = await getCollection('products')
    .then((products) => products.findOne({ name }));

  return product;
};

module.exports = {
  create,
  getProduct,
};
