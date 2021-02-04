const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertNewSale = async (itensSold) => getConnection().then(async (db) => {
  const newSale = await db.collection('sales').insertMany(itensSold);
  const product = { _id: ObjectId(newSale.insertedId), itensSold: newSale.ops };
  return product;
});

module.exports = { insertNewSale };
