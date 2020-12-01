const { ObjectId } = require('mongodb');
const connection = require('./connection');

const theCollection = 'sales';

const create = async (arrayFromBody) => {
  const insert = await connection()
    .then((db) => db.collection(theCollection).insertOne({ itensSold: arrayFromBody }));
  //  .ops fornece o insert com o _id.
  return insert.ops[0];
};

const getAll = async () => {
  const saida = await connection().then((db) => db.collection(theCollection).find({}).toArray());
  return { sales: saida };
};

const getById = async (id) => connection()
  .then((db) => db.collection(theCollection).findOne({ _id: { $in: [ObjectId(id)] } }));

const update = async (id, arrayFromBody) => {
  await connection()
    .then((db) => db.collection(theCollection).updateOne(
      { _id: { $in: [ObjectId(id)] } },
      { $set: { itensSold: arrayFromBody } },
    ));
  return { _id: id, itensSold: arrayFromBody };
};

const exclude = async (id) => connection()
  .then((db) => db.collection(theCollection).deleteOne({ _id: { $in: [ObjectId(id)] } }));

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
