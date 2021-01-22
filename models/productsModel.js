// const { ObjectId } = require('mongodb');
const { getCollection } = require('./connection');

const createProduct = async (name, quantity) => {
  const connect = await getCollection('products');
  const result = await connect.insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  createProduct,
};
