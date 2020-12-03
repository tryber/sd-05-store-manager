const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

const findByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const addProduct = async (name, quantity) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .catch((err) => console.log(err));
};

const updateProduct = async (id, name, quantity) => {
  connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return true;
};

const removeProduct = async (id) =>
  connection().then((db) => db.collection('products').deleteOne({ _id: Object(id) }));

module.exports = {
  getAllProducts,
  findByName,
  findById,
  addProduct,
  updateProduct,
  removeProduct,
};
