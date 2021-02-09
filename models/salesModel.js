const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const createSale = async (arr) => {
  const addSale = await getCollection('sales').then((sales) =>
    sales.insertOne({ itensSold: arr }));
  return { _id: addSale.insertedId, itensSold: arr };
};

const getAllSales = async () =>
  getCollection('sales').then((sales) => sales.find().toArray());

const getBySalesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));
};

const getSaleByName = async (name) => getCollection('sales').then((sales) => sales.findOne({ name }));

const updateSale = async (id, arr) => {
  if (!ObjectId.isValid(id)) return null;

  await getCollection('sales').then((sales) =>
    sales.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: arr } }));
  return { _id: id, itensSold: arr };
};

const deleteSale = async (id) => {
  const sale = await getBySalesId(id);
  await getCollection('sales').then((salez) => {
    salez.deleteOne({ _id: ObjectId(id) });
  });
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getBySalesId,
  updateSale,
  deleteSale,
  getSaleByName,
};
