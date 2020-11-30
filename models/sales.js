const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSale = async (salesArr) => {
  const db = await connection();
  const setNewSales = await db
    .collection('sales')
    .insertOne({ itensSold: salesArr })
    .then((result) => ({ _id: result.insertedId, itensSold: salesArr }));
  return setNewSales;
};

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getSaleById = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};

const updateSale = async (id, itensSold) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { _id: id, itensSold };
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  updateSale,
};
