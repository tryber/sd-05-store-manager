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

  return connection('products')
    .then((product) => product.findOne(ObjectId(id)));
};

/*  ********************************************************************************************* */
const update = async (id, name, quantity) =>
  connection('products')
    .then((products) => products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

/*  ********************************************************************************************* */
const exclude = async (id) =>
  connection('products')
    .then((product) => product.findOneAndDelete({ _id: ObjectId(id) }))
    .then((exclude) => exclude.value);

module.exports = {
  create,
  update,
  getAll,
  getById,
  exclude,
  findProduct,
};
