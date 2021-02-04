const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const insertSale = async (sales) =>
  getConnection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => ({ _id: result.insertedId, itensSold: sales }))
    .catch((err) => console.log(err));

const findAllSales = async () => getConnection().then(async (db) => {
  const allSales = await db.collection('sales').find().toArray();
  const returnSales = { sales: allSales };
  return returnSales;
});

const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch((err) => console.log(err));

const updateSale = async (id, productId, quantity) =>
  getConnection()
    .then((db) =>
      db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } }))
    .catch((err) => console.log(err));

const deleteSale = async (id) =>
  getConnection()
    .then((db) => {
      const delSales = db.collection('sales').deleteOne({ _id: ObjectId(id) });
      const saleDeleted = { delSales };
      console.log('aqui no model', saleDeleted);
      return saleDeleted;
    })
    .catch((err) => console.log(err));

module.exports = {
  insertSale,
  findAllSales,
  findById,
  updateSale,
  deleteSale,
};
