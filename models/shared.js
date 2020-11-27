const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAll = async (collection) => {
  const db = await connection(collection);
  const result = await db.find({}).toArray();

  return result;
};

const findById = async (collection, id) => {
  const db = await connection(collection);
  if (ObjectId.isValid(id)) {
    const result = await db.findOne(ObjectId(id));
    return result;
  }
};

const exclude = async (collection, id) => {
  const db = await connection(collection);
  const deletedProduct = await db.findOne({ _id: ObjectId(id) });
  await db.deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
};

module.exports = { findAll, findById, exclude };
