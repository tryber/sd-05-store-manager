const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itensSold) => {
  const addSales = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));

  return { _id: addSales.insertedId, itensSold };
};

const getAllSales = async () => {
  const salesList = await connection().then((db) => db.collection('sales').find({}).toArray());

  return salesList;
};

const getSalesById = async (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

const updateSales = async (id, itensSold) => {
  await connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return { _id: id, itensSold };
};

const deleteSales = async (id) =>
  connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = { createSales, getAllSales, getSalesById, updateSales, deleteSales };
