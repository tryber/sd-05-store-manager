const { ObjectId } = require('mongodb');
const getCollection = require('./get-collection');

const create = async (name, quantity) =>
  getCollection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const hasProduct = async (productName) =>
  getCollection('products').then((product) => product.findOne({ name: productName }));

const getAllProducts = async () =>
  getCollection('products').then((products) => products.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await getCollection('products').then((products) =>
    products.findOne(ObjectId(id)));
  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const products = await getCollection('products').then((product) =>
    product.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return products;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const deletedProduct = await getCollection('products').then((product) =>
    product.deleteOne({ _id: ObjectId(id) }));
  return deletedProduct;
};

const modifyStock = async (productId, quantity, type) => {
  const id = ObjectId(productId);
  if (type === 'sold') {
    const solded = await getCollection('products').then((products) =>
      products.updateOne({ _id: id }, { $inc: { quantity: -quantity } }));
    return solded;
  }
  if (type === 'cancel') {
    const cancel = await getCollection('products').then((products) =>
      products.updateOne({ _id: id }, { $inc: { quantity } }));
    return cancel;
  }
};

module.exports = {
  create,
  update,
  remove,
  getById,
  hasProduct,
  modifyStock,
  getAllProducts,
};
