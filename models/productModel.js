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

const update = async (id, name, quantity) =>
  getCollection('products').then((products) =>
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

const exclude = async (id) =>
  getCollection('products').then((products) => products.deleteOne({ _id: ObjectId(id) }));
// -----
const incrementQuantity = async (productId, quantity, vendaOuDelete) => {
  if(vendaOuDelete === 'venda') {
   console.log('increment com venda');
    getCollection('products').then((products) =>
      products.updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: -quantity } }),
    );
  } else if (vendaOuDelete === 'delete') {
    console.log('decrement com delete');

        getCollection('products').then((products) =>
      products.updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: quantity } }),
    );

  }
}
// -----

module.exports = { add, findProductByName, getAll, findById, update, exclude, incrementQuantity };
