const { ObjectId } = require('mongodb');
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
  return connection('products')
    .then((product) => {
      return product.find({ name: { $eq: `${name}` } });
    })
    .then(async (result) => {
      if (!result) {
        console.log('sim')
        return false;
      }
      console.log('não')
      return true;
    });
};

module.exports = {
  add,
  findByName,
};
