const connection = require('./connection');

const add = async (collection, itensSold) => {
  const db = await connection(collection);
  await db.insertMany(itensSold);

  return { itensSold };
};

module.exports = {
  add,
};
