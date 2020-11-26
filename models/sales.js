const connection = require('./connection');

const add = async (collection, itensSold) => {
  const db = await connection(collection);
  const result = await db.insertOne({ itensSold });

  return { _id: result.insertedId, itensSold };
};

module.exports = {
  add,
};
