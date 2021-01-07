// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findProduct = async (name) =>
  connection()
    .then((db) => db.collection('products'))
    .then((product) => product.findOne({ name }));

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

module.exports = { findProduct, create };
