const connection = require('./connection');
// const mongodb = require('mongodb');
// const { ObjectId } = require('mongodb');

// O model faz a relação com o BD, no caso, o mongoDB, usando o arquivo connection.js .

const findProdByName = async (name) =>
  connection()
    .then((db) => db.collection('products'))
    .then((products) => products.findOne({ name }));

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
// para personalizar retorno pois objeto result é bem maior

module.exports = { findProdByName, create };
