const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createSales = async (itensSold) => {
  const newSale = await getCollection('sales').then((sales) => sales.insertOne({ itensSold }));

  return { _id: newSale.insertedId, itensSold };
};

const findBySalesId = async (id) => {
  if (ObjectId.isValid(id)) {
    const sale = await getCollection('sales').then((sales) =>
      sales.findOne({ _id: ObjectId(id) }));
    return sale;
  }
  return null;
};

const getAllSales = async () => {
  const allSales = await getCollection('sales').then((sales) => sales.find().toArray());

  return allSales;
};

const updateSalesById = async (id, obj) => {
  const { itensSold } = obj;
  const allSales = await getCollection('sales');
  await allSales.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { _id: ObjectId(id), itensSold };
};

const deleteSalesById = async (id) => {
  const deletedSale = await getCollection('sales').then((sales) =>
    sales.findOne({ _id: ObjectId(id) }));
  console.log(deletedSale, 'deleted');
  await getCollection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(id) }));
  return deletedSale;
};

module.exports = {
  createSales,
  deleteSalesById,
  findBySalesId,
  getAllSales,
  updateSalesById,
};
