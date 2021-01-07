const { ObjectId } = require('mongodb');
const connection = require('./connection');

/*  ********************************************************************************************* */
const findProduct = async (name) =>
  connection('products')
    .then((product) => product.findOne({ name }));

/*  ********************************************************************************************* */
const create = async (name, quantity) =>
   connection('products')
    .then((product) => product.insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

/*  ********************************************************************************************* */
const getAll = async () =>
   connection('products')
    .then((product) => product.find().toArray());

/*  ********************************************************************************************* */
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return  connection('products')
    .then((product) => product.findOne(ObjectId(id)));
};

module.exports = { findProduct, create, getAll, getById };
