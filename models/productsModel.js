const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) =>
  connection()
    .then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  findById,
  findByName,
};
