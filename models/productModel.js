const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAllProducts = async () => {
  const db = await getConnection();
  const allProducts = await db.getConnection('products').find().toArray()
  return allProducts
};

// Substituí pelo de cima
// const getAllProducts = async () =>
//   getConnection()
//     .then((db) => db.collection('products').find().toArray())
//     .catch((err) => {
//       console.log(err);
//       process.exit(1);
//     });

const findByName = async (name) =>
  getConnection().then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getConnection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const addProduct = async (name, quantity) => {
    getConnection()
      .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((result) => result)
      .catch((err) => console.log(err));
};

const updateProduct = async (id, name, quantity) => {
  getConnection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return true;
};

const removeProduct = async (id) =>
  getConnection().then((db) => db.collection('products').deleteOne({ _id: Object(id) }));

module.exports = {
  getAllProducts,
  findByName,
  findById,
  addProduct,
  updateProduct,
  removeProduct,
};
