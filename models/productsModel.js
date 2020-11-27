// const { ObjectId } = require('mongodb');

const getCollection = require('./get-collection');

const create = async (name, quantity) =>
  getCollection('products')
    .then((products) => products.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertId, name, quantity }));

const findByName = async (name) =>
  getCollection('products').then((products) => products.findOne({ name }));

module.exports = {
  create,
  findByName,
};
