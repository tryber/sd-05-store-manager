const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () => getConnection().then((db) => (db.collection('products').find().toArray()));

const getOne = async (name) => getConnection().then((db) => (db.collection('products').findOne({ name })));

const getById = async (id) => getConnection().then(async (db) => {
  const productById = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (!productById) {
    return null;
  }
  return productById;
});

const changeById = async (id, name, quantity) => getConnection().then(async (db) => {
  db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
});

const insertNewProduct = async (name, quantity) => getConnection().then(async (db) => {
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  const product = { _id: newProduct.insertedId, name, quantity };
  return product;
});

const deleteProduct = async (id) => getConnection().then(async (db) => {
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  console.log('cheguei model');
});

module.exports = { getAll, getOne, insertNewProduct, getById, changeById, deleteProduct };
