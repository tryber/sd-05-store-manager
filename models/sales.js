const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (collection, itensSold) => {
  const db = await connection(collection);
  const result = await db.insertOne({ itensSold });

  return { _id: result.insertedId, itensSold };
};

const update = async (collection, id, query) => {
  const db = await connection(collection);
  const { itensSold } = query;

  await db.updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
  );

  return { _id: ObjectId(id), itensSold };
};

module.exports = {
  add,
  update,
};
