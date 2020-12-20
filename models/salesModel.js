const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createSales = async (itensSold) => {
  await getCollection('sales').then((sales) => sales.insertMany(itensSold));

  return { itensSold };
};

const findBySaleId = async (id) => {
  const sale = await getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));

  return sale;
};

const getAllSales = async () => {
  const allSales = await getCollection('sales').then((sales) => sales.find().toArray());

  return allSales;
};

const updateSaleById = async (id, objeto) => {
  const { name, quantity } = objeto;
  const allSales = await getCollection('sales');

  await allSales.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { _id: ObjectId(id), name, quantity };
};

const excludeSaleById = async (id) => {
  const deletedSale = await getCollection('sales')
    .then((sales) => sales.deleteOne({ _id: ObjectId(id) }));

  return deletedSale;
};

module.exports = {
  createSales,
  findBySaleId,
  getAllSales,
  updateSaleById,
  excludeSaleById,
};
