const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const create = async (name, quantity) => {
  const createProduct = await getCollection('products')
    .then((products) => products.insertOne({ name, quantity }));

  return { _id: createProduct.insertedId, name, quantity };
};

const getProductByName = async (name) => {
  const product = await getCollection('products')
    .then((products) => products.findOne({ name }));

  return product;
};

const getAllProducts = async () => {
  const allProducts = await getCollection('products')
    .then((products) => products.find({}).toArray());
  return allProducts;
};

const getProductById = async (id) => {
  const product = await getCollection('products')
    .then((products) => products.findOne(ObjectId(id)));
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await getCollection('products')
    .then((products) => products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { _id: id, name, quantity };
}

module.exports = {
  create,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
};
