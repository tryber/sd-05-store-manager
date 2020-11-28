const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllSales = async () =>
  getCollection('sales').then((sales) => sales.find().toArray());

const getSalesById = async (id) => getCollection('sales').then((db) => db.findOne(ObjectId(id)));
// if (!ObjectId.isValid(id)) return null;

const createSales = async (itensSold) => {
  const sale = await getCollection('sales').then((db) => db.insertOne({ itensSold }));
  return { _id: sale.insertedId, itensSold };
};

const updateSales = async (id, productId, quantity) => {
  // if (!ObjectId.isValid(id)) return null;
  const sale = await getCollection('sales')
    .then((sales) => sales.updateOne(
      { _id: ObjectId(id), 'itensSold.productId': productId },
      { $set: { 'intensSold.0.quantity': quantity } },
    ));

  return sale;
};

const excludeSales = async (id) => getCollection('sales')
  .then((db) => db.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllSales,
  getSalesById,
  createSales,
  updateSales,
  excludeSales,
};
