const connection = require('./connection');

const insertProduct = async (name, quantity) => {
  const db = await connection();

  const result = await db.collection('products').insertOne({ name, quantity });

  if (!result) return null;

  return result;
};

module.exports = {
  insertProduct,
};
