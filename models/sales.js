const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertNewSale = async (body) => getConnection().then(async (db) => {
  // const spreadItensSold = {...body}
  // console.log(body)
  // await db.collection('products').updateOne(_{_id: ObjectId(spreadItensSold)} )
  const newSale = await db.collection('sales').insertOne(body);
  const product = { ...newSale.ops[0] };
  return product;
});

const getSales = async () => getConnection().then(async (db) => {
  const allSales = await db.collection('sales').find().toArray();
  const returnSales = { sales: allSales };
  return returnSales;
});

const getSale = async (id) => getConnection().then(async (db) => {
  try {
    const sale = await db.collection('sales').findOne(ObjectId(id));
    const returnSales = { sales: sale };
    return returnSales;
  } catch (error) {
    return null;
  }
});

const changeById = async (idVenda, arraySales) => getConnection().then(async (db) => {
  db.collection('sales').updateOne({ _id: ObjectId(idVenda) }, { $set: { itensSold: arraySales } });
  return { _id: idVenda, itensSold: arraySales };
});

const deleteSale = async (id) => getConnection().then(async (db) => {
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return { _id: id };
});

module.exports = { insertNewSale, getSales, getSale, changeById, deleteSale };
