const makeConnection = require('./connection');
const { ObjectId } = require('mongodb');

const createSales = async (itensSold) => {
  const newSale = await makeConnection('sales').then((sales) => sales.insertOne(itensSold));

  return { _id: newSale.insertedId, itensSold };
};

const findBySaleId = async (id) => {
  if (ObjectId.isValid(id)) {
    const sale = await makeConnection('sales').then((sales) =>
      sales.findOne({ _id: ObjectId(id) }),
    );
    return sale;
  }
  return null;
};

const getAllSales = async () => {
  const allSales = await makeConnection('sales').then((sales) => sales.find().toArray());

  return allSales;
};

const updateSaleById = async (id, obj) => {
  const { itensSold } = obj;
  const allSales = await getCollection('sales');
  await allSales.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { _id: ObjectId(id), itensSold };
};

const deleteSaleById = async (id) => {
  const deletedSale = await getCollection('sales').then((sales) =>
    sales.findOne({ _id: ObjectId(id) }));
  console.log(deletedSale, 'deleted');
  await makeConnection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(id) }));
  return deletedSale;
};

module.exports = {
  createSales,
  deleteSaleById,
  findBySaleId,
  getAllSales,
  updateSaleById,
};
