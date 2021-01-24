const { ObjectId } = require('mongodb');
const { getCollection } = require('./connection');

const createProduct = async (name, quantity) => {
  const connect = await getCollection('products');
  const result = await connect.insertOne({ name, quantity });

  return { _id: result.insertedId, name, quantity };
};

const getProducts = async () => {
  const connect = await getCollection('products');
  const result = connect.find({});

  return result.toArray();
};

const getProductById = async (id) => {
  const connect = await getCollection('products');
  const result = connect.findOne(ObjectId(id));

  return result;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
};
