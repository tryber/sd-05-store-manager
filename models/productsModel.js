const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const addProducts = await getCollection('products').then((produtos) =>
    produtos.insertOne({ name, quantity }));
  return { _id: addProducts.insertedId, name, quantity };
};

const getAllProducts = async () =>
  getCollection('products').then((products) => products.find().toArray());

const getByProductId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then((products) => products.findOne(ObjectId(id)));
};

const getProductByName = async (name) => getCollection('products').then((products) => products.findOne({ name }));

const updateProduct = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const productid = await getCollection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return productid;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const deleteId = await getCollection('products').then((product) => {
    product.deleteOne({ _id: ObjectId(id) });
  });
  return deleteId;
};

module.exports = {
  createProduct,
  getAllProducts,
  getByProductId,
  updateProduct,
  deleteProduct,
  getProductByName,
};
