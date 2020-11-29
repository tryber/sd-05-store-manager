const mongoCollection = require('./mongo');

const register = async (name, quantity) =>
  mongoCollection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertId, name, quantity }));

const checkProduct = async (productName) =>
  mongoCollection('products').then((product) => product.findOne({ name: productName }));

module.exports = {
  register,
  checkProduct,
};
