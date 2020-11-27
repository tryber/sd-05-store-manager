const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const insert = await connection().then((db) => db.collection('products').insertOne({ name, quantity }));
  //  .ops fornece o insert com o _id.
  return insert.ops[0];
};

const productExists = async (name) => connection().then((db) => db.collection('products').findOne({ name }));

const getAll = async () => {
  const saida = await connection().then((db) => db.collection('products').find({}).toArray());
  return { products: saida };
};

const getById = async (id) => connection().then((db) => db.collection('products').findOne({ _id: { $in: [ObjectId(id)] } }));

const update = async (id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: { $in: [ObjectId(id)] } },
      { $set: { name, quantity } },
    ));
  return { _id: id, name, quantity };
};

module.exports = {
  create,
  productExists,
  getAll,
  getById,
  update,
};
