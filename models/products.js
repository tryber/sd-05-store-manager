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
  const result = await db.findOne({ _id: id });

  return result;
};

module.exports = {
  add,
  findByName,
  findById,
};
