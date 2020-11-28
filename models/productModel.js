const { ObjectId } = require('mongodb');
const connection = require('./connection');

const theCollection = 'products';

const create = async (name, quantity) => {
  const insert = await connection().then((db) =>
    db.collection(theCollection).insertOne({ name, quantity }));
  //  .ops fornece o insert com o _id.
  return insert.ops[0];
};

const productExistsByName = async (name) => connection()
  .then((db) => db.collection(theCollection).findOne({ name }));

const getAll = async () => {
  const saida = await connection().then((db) => db.collection(theCollection).find({}).toArray());
  return { products: saida };
};

const getById = async (id) => connection()
  .then((db) => db.collection(theCollection).findOne({ _id: { $in: [ObjectId(id)] } }));

const update = async (id, name, quantity) => {
  await connection()
    .then((db) => db.collection(theCollection).updateOne(
      { _id: { $in: [ObjectId(id)] } },
      { $set: { name, quantity } },
    ));
  return { _id: id, name, quantity };
};

const exclude = async (id) => connection()
  .then((db) => db.collection(theCollection).deleteOne({ _id: { $in: [ObjectId(id)] } }));

module.exports = {
  create,
  productExistsByName,
  getAll,
  getById,
  update,
  exclude,
};
