const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (collection, query) => {
  const { name, quantity } = query;
  const db = await connection(collection);
  const result = await db.insertOne(query);

  return { _id: result.insertedId, name, quantity };
};

const update = async (collection, id, query) => {
  const { name, quantity } = query;
  const db = await connection(collection);

  await db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { _id: ObjectId(id), name, quantity };
};

const findByName = async (collection, name) => {
  const db = await connection(collection);
  const result = await db.findOne({ name });

  return result;
};

const exclude = async (collection, id) => {
  const db = await connection(collection);
  const deletedProduct = await db.findOne({ _id: ObjectId(id) });
  await db.deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
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
  update,
  exclude,
};
