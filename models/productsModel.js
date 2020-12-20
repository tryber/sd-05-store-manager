const { ObjectId } = require('mongodb');
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

const findByProductId = async (id) => {
  const product = await getCollection('products')
    .then((products) => products.findOne(ObjectId(id)));
  console.log(product);
  return product;
};

const getAllProducts = async () => {
  const allProducts = await getCollection('products')
    .then((products) => products.find({}).toArray());
  return allProducts;
};

module.exports = {
  createProduct,
  findByProductName,
  findByProductId,
  getAllProducts,
};
