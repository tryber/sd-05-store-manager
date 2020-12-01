const storeCollection = require('./connection');

const getAll = async () => {
  storeCollection('products')
    .then((products) => products.find().toArray());
};

const nameProd = async (name) =>
  storeCollection('products')
    .then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  storeCollection('products')
    .then((result) => result.insertOne({ name, quantity }))
    .then((prod) => ({ _id: prod.insertedId, name, quantity }));

module.exports = {
  getAll,
  create,
  nameProd,
};
