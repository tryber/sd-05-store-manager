const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = (name, quantity) =>
  connection('products')
    .then((product) => (
      product.insertOne({ name, quantity })
    ))
    .then((result) => ({
      _id: result.insertedId,
      name,
      quantity,
    }));

module.exports = {
  add,
};
