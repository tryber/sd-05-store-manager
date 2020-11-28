const connection = require('./connection');

const add = (name, quantity) =>
  connection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      quantity,
    }));

const findByName = async (name) => {
  return connection('products').then((product) =>
    product.find({ name: { $eq: `${name}` } }).toArray(),
  );
};

module.exports = {
  add,
  findByName,
};
