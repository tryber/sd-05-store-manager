const getCollection = require('./getCollection');

const create = async (name, quantity) =>
  getCollection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const checkProduct = async (pName) =>
  getCollection('products').then((product) => product.findOne({ name: pName }));

module.exports = {
  create,
  checkProduct,
};
