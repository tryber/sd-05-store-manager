const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertProduct = async (name, quantity) => {
  const db = await connection();
  const result = await db
    .collection('products')
    .insertOne({ name, quantity })
    .then((answer) => ({
      _id: answer.insertedId,
      name,
      quantity,
    }));
  if (!result) return null;
  return result;
};

const getProduct = async (name) => {
  const db = await connection();
  return db.collection('products').findOne({ name });
};

const getAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const getProductById = async (id) => {
  const db = await connection();
  return db.collection('products').findOne(ObjectId(id));
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  return db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
};

const deleteProduct = async (id) => {
  const db = await connection();
  return db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  insertProduct,
  getProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
