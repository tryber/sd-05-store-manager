const storeCollection = require('./connection');

const getAll = async () => {
  storeCollection('products').then((products) => products.find().toArray());
};

const nameProd = async (name) =>
  storeCollection()
    .then((db) => db.collection('products'))
    .then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  storeCollection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((prod) => ({ _id: prod.insertedId, name, quantity }));

module.exports = {
  getAll,
  create,
  nameProd,
};
