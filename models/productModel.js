const { ObjectId } = require('mongodb');
const getCollection = require('./get-Collection');

const add = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findProductByName = async (name) =>
  getCollection('products').then((products) => products.findOne({ name }));

const getAll = async () => getCollection('products').then((products) => products.find().toArray());

const findById = async (id) => getCollection('products').then((res) => res.findOne(ObjectId(id)));
// prettier-ignore
const update = async (id, name, quantity) =>
  getCollection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

const exclude = async (id) =>
  getCollection('products').then((products) => products.deleteOne({ _id: ObjectId(id) }));
// -----
// REVIEW
// prettier-ignore
const incrementQuantity = async (productId, quantity, vendaOuDelete) => {
  const id = ObjectId(productId);
  if (vendaOuDelete === 'venda') {
    // console.log('increment com venda');
    getCollection('products').then((products) =>
      products.updateOne({ _id: id }, { $inc: { quantity: -quantity } }));
  } else if (vendaOuDelete === 'delete') {
    // console.log('decrement com delete');

    getCollection('products').then((products) =>
      products.updateOne({ _id: id }, { $inc: { quantity } }));
  }
};
// -----

module.exports = { add, findProductByName, getAll, findById, update, exclude, incrementQuantity };
