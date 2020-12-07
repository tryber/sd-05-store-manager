const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const registerSale = async (itensSold) => {
  const createSale = await getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }));

  return { _id: createSale.insertedId, itensSold };
};

const getAllSales = async () => {
  const allSales = await getCollection('sales')
    .then((sales) => sales.find({}).toArray());

  return allSales;
};

const getSaleById = async (id) => {
  const sale = await getCollection('sales')
    .then((sales) => sales.findOne(ObjectId(id)));

  return sale;
};

const updateSale = async (id, itensSold) => {
  await getCollection('sales')
    .then((sales) => sales.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return { _id: id, itensSold };
};

module.exports = {
  registerSale,
  getAllSales,
  getSaleById,
  updateSale,
};
