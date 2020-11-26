const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (collection, query) => {
  const { name, quantity } = query;
  const db = await connection(collection);
  const result = await db.insertOne(query);

  return { _id: result.insertedId, name, quantity };
};

const findByName = async (collection, name) => {
  const db = await connection(collection);
  const result = await db.findOne({ name });

  return result;
};

const findById = async (collection, id) => {
  const db = await connection(collection);
  const result = await db.findOne(ObjectId(id));

  return result;
};

const findAll = async (collection) => {
  const db = await connection(collection);
  const result = await db.find({}).toArray();

  return result;
};

module.exports = {
  add,
  findByName,
  findById,
  findAll,
};
