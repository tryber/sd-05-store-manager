const getCollection = require('./connection');

const create = async (name, quantity) => 
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

module.exports = {
  create,
};
