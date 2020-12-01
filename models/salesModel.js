const getCollection = require('./getCollection');

const create = async (products) =>
  getCollection('sales')
    .then((product) => product.insertOne({ itensSold: products }))
    .then((result) => ({ _id: result.insertedId, itensSold: products }));
// const checkP = async (arrayBody) =>
//   getCollection('sales').then((product) => product.find({ _id: { $in: [arrayBody] } }));

module.exports = {
  create,
  // checkP,
};
