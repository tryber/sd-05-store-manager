// Referências:
// https://github.com/tryber/sd-05-live-lectures/blob/models-and-db/models/charactersModel.js
// https://github.com/tryber/sd-05-live-lectures/blob/rest-restful/models/peopleModel.js

const { ObjectId } = require('mongodb');
const mongodbConnection = require('./mongodbConnection');

const findByName = async (collectionName, name) => {
  const getCollection = await mongodbConnection(collectionName);
  const productByName = await getCollection.findOne({ name });
  return productByName;
};

const register = async (collectionName, name, quantity) => {
  const getCollection = await mongodbConnection(collectionName);
  const registeredProduct = await getCollection.insertOne({ name, quantity });
  return { _id: registeredProduct.insertedId, name, quantity };
};

const listAll = async (collectionName) => {
  const getCollection = await mongodbConnection(collectionName);
  const allProducts = await getCollection.find({}).toArray();
  return allProducts;
};

const listById = async (collectionName, id) => {
  if (!ObjectId.isValid(id)) return null;
  const getCollection = await mongodbConnection(collectionName);
  const productById = await getCollection.findOne({ _id: ObjectId(id) });
  return productById;
};

const update = async (collectionName, id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const getCollection = await mongodbConnection(collectionName);
  await getCollection.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
};

const remove = async (collectionName, id) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, quantity } = await listById(collectionName, id);
  const getCollection = await mongodbConnection(collectionName);
  await getCollection.remove({ _id: ObjectId(id) });
  return { _id: id, name, quantity };
};

module.exports = {
  findByName,
  register,
  listAll,
  listById,
  update,
  remove,
};
