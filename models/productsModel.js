const getCollection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = await getCollection('products')
    .then((products) => products.insertOne({ name, quantity }));

  return { _id: newProduct.insertedId, name, quantity };
};

const findByProductName = async (name) => {
  const product = await getCollection('products')
    .then((products) => products.findOne({ name }));

  return product;
};

const getAllProducts = async () => {
  const db = await getCollection('products');
  const allProducts = await db.find().toArray();
  return allProducts;
};

module.exports = {
  createProduct,
  findByProductName,
  getAllProducts,
};
