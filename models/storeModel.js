// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const insert = await connection().then((db) => db.collection('products').insertOne({ name, quantity }));
  //  .ops fornece o insert com o _id.
  return insert.ops[0];
};

const productExists = async (name) => connection().then((db) => db.collection('products').findOne({ name }));

module.exports = {
  create,
  productExists,
};
