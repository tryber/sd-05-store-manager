const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllSales = async () =>
  getCollection('sales').then((sales) => sales.find().toArray());

const getSalesById = async (id) => getCollection('sales')
  .then((db) => db.findOne(ObjectId(id)));

const createSales = async (itensSold) => {
  const sale = await getCollection('sales').then((db) => db.insertOne({ itensSold }));
  return { _id: sale.insertedId, itensSold };
};

const updateSales = async (id, productId, quantity) => {
  const sale = await getCollection('sales')
    .then((sales) => sales.updateOne(
      { _id: ObjectId(id), 'itensSold.productId': productId },
      { $set: { 'intensSold[0].quantity': quantity } },
    ));

  return sale;
};

const excludeSales = async (id) => {
  const deleted = await getCollection('sales')
    .then((db) => db.deleteOne({ _id: ObjectId(id) }));
  console.log(deleted)
  return deleted;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSales,
  updateSales,
  excludeSales,
};
