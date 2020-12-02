const { ObjectId } = require('mongodb');
const getCollection = require('./getCollection');

const create = async (name, quantity) =>
  getCollection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const checkProduct = async (pName) =>
  getCollection('products').then((product) => product.findOne({ name: pName }));

const getAll = async () => getCollection('products').then((product) => product.find().toArray());
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('products').then((product) => product.findOne(ObjectId(id)));
};
const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const products = await getCollection('products').then((product) =>
    product.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return products;
};
const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const deleteP = await getCollection('products').then((product) =>
    product.deleteOne({ _id: ObjectId(id) }));
  return deleteP;
};
module.exports = {
  create,
  checkProduct,
  getAll,
  getById,
  update,
  deleteProduct,
};
