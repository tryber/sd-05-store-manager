const getCollection = require('./get-Collection');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

module.exports = { add };
