const { ObjectId } = require('mongodb');

const mongodbConnection = require('./mongodbConnection');

const register = async (collectionName, sale) => {
  const getCollection = await mongodbConnection(collectionName);
  const registeredSale = await getCollection.insertOne({ itensSold: sale });
  return { _id: registeredSale.insertedId, itensSold: sale };
};

const listAll = async (collectionName) => {
  const getCollection = await mongodbConnection(collectionName);
  const allSales = await getCollection.find().toArray();
  return allSales;
};

const listById = async (collectionName, id) => {
  if (!ObjectId.isValid(id)) return null;
  const getCollection = await mongodbConnection(collectionName);
  const saleById = await getCollection.findOne({ _id: ObjectId(id) });
  return saleById;
};

const update = async (collectionName, id, sale) => {
  if (!ObjectId.isValid(id)) return null;
  const getCollection = await mongodbConnection(collectionName);
  await getCollection.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return { _id: id, itensSold: sale };
};

const remove = async (collectionName, id) => {
  if (!ObjectId.isValid(id)) return null;
  const getCollection = await mongodbConnection(collectionName);
  const removedSale = await getCollection.remove({ _id: ObjectId(id) });
  return removedSale;
};

module.exports = {
  register,
  listAll,
  listById,
  update,
  remove,
};
