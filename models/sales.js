const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertNewSale = async (body) => getConnection().then(async (db) => {
  const newSale = await db.collection('sales').insertOne(body);
  const product = { ...newSale.ops[0] };
  console.log(newSale.ops);
  return product;
});

const getSales = async () => getConnection().then(async (db) => {
  const allSales = await db.collection('sales').find().toArray();
  const returnSales = { sales: allSales };
  return returnSales;
});

const getSale = async (id) => getConnection().then(async (db) => {
  const sale = await db.collection('sales').findOne(ObjectId(id)).toArray();
  const returnSales = { sales: sale };
  return returnSales;
});

module.exports = { insertNewSale, getSales, getSale };
