const getCollection = require('./connection');

const findProductByName = async (name) =>
  getCollection('products')
    .then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

module.exports = {
  create,
  findProductByName,
};
