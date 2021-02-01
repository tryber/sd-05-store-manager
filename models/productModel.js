const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertProduct = async (name, quantity) =>
  getConnection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0])
    .catch((err) => console.log(err));

const findAllProducts = async () => 
  getConnection()
    .then((db) => db.collection('products').find({}).toArray())
    .then((products) => products)
    .catch((err) => console.log(err));

const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

const findByName = async (name) =>
  getConnection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch((err) => console.log(err));

const updateProduct = async (id, name, quantity) =>
  getConnection()
    .then((db) =>
      db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    // .then((result) => result.ops[0])
    .catch((err) => console.log(err));

const deleteProduct = async (id) =>
  getConnection()
    .then((db) => db.collection('products').deleteOne({ _id: Object(id) }))
    .catch((err) => console.log(err));

module.exports = {
  insertProduct,
  findAllProducts,
  findByName,
  findById,
  updateProduct,
  deleteProduct,
};
