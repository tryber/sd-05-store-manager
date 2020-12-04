const connection = require('./connection');

const createSales = async (itensSold) => {
  const addSales = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));

  return { _id: addSales.insertedId, itensSold };
};

module.exports = { createSales };
