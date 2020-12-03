const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createData = async (query, collection) =>
  connection(collection)
    .then((item) => item.insertOne(query))
    .then((result) => ({ _id: result.insertedId, query }));

const findByName = async (query, collection) =>
  connection()
    .then((db) => db.collection(collection).findOne({ query }));

const findById = async (id, collection) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const findAll = async (collection) =>
  connection()
    .then((db) => db.collection(collection).find().toArray());

module.exports = {
  createData,
  findByName,
  findById,
  findAll,
};
