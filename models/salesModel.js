const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createSales = async (itensSold) => {
  await getCollection('sales')
    .then((sales) => sales.insertMany(itensSold));

  return { itensSold };
};

const findBySaleId = async (id) => {
  const sale = await getCollection('sales').then((sales) =>
    sales.findOne(ObjectId(id)));

  return sale;
};

const getAllSales = async () => {
  const allSales = await getCollection('sales').then((sales) =>
    sales.find().toArray());

  return allSales;
};

module.exports = {
  createSales,
  findBySaleId,
  getAllSales,
};
