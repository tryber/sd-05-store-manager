const { ObjectId } = require('mongodb');
const { getCollection } = require('./connection');

const connect = getCollection('products');

const createProduct = async (name, quantity) => {
  const result = await connect
    .then((item) => item.insertOne({ name, quantity }));

  return { _id: result.insertedId, name, quantity };
};

const getProducts = async () => {
  const result = await connect
    .then((item) => item.find({}));

  return result.toArray();
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect.then((item) => item.findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const result = connect
    .then((item) => item.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return { _id: result.insertedId, name, quantity };
};

const deleteProduct = async (id) => connect.then((e) => e.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
