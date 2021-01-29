const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (name, quantity) => 
  getConnection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .catch((err) => console.log(err));  

const findAllProducts = async () =>
  getConnection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({_id, name, product}) => ({ id: _id, name, product })))
    .catch((err) => console.log(err));
    
const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

const findByName = async (name) =>
  getConnection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch((err) => console.log(err));


const updateProduct = async (id, name, quantity) => {
  getConnection()
    .then((db) =>
      db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .catch((err) => console.log(err));

const deleteProduct = async (id) =>
  getConnection()
    .then((db) => db.collection('products').deleteOne({ _id: Object(id) }))
    .catch((err) => console.log(err));

// Substituída
// const getAllProducts = async () => {
//   const db = await getConnection();
//   const allProducts = await db.getConnection('products').find().toArray();
//   return allProducts;
// };

module.exports = {
  insertProduct,
  findAllProducts,
  findByName,
  findById,
  updateProduct,
  deleteProduct,
};
