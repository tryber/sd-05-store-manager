const connection = require('./connection');

const findAll = async (collection) => {
  const db = await connection(collection);
  const result = await db.find({}).toArray();

  return result;
};

const findById = async (collection, id) => {
  const db = await connection(collection);
  const result = await db.findOne(ObjectId(id));

  return result;
};

module.exports = { findAll, findById };
