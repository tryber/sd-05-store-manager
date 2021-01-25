// Crie uma nova instância ObjectID
const { ObjectId } = require('mongodb');
// https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
const getCollection = require('./connection');

const register = async (name, quantity) => {
  getCollection('products').then((products) =>
    products.insertOne({ name, quantity }).then((result) => ({
      _id: result.insertedId,
      name,
      quantity,
    })));
};

const getAll = async () =>
  getCollection('products').then((products) => products.find({}).toArray());

const updateProduct = async (name, quantity, id) => {
  getCollection('products').then((products) =>
    (ObjectId.isValid(id) ? products.update({ _id: ObjectId(id) }, { $set: { name, quantity } })
      : null));
};

const deleteProducts = async (id) =>
  getCollection('products').then((products) =>
    (ObjectId.isValid(id) ? products.deleteOne({ _id: ObjectId(id) }) : null));

const nameSearch = async (name) =>
  getCollection('products').then((products) => products.find({ name }).toArray());

const idSearch = async (id) =>
  getCollection('products').then((products) =>
    (ObjectId.isValid(id) ? products.findOne({ _id: ObjectId(id) }) : null));

const saleQuantity = async (id, qntSale) =>
  getCollection('products').then((products) =>
    (ObjectId.isValid(id) ? products.update({ _id: ObjectId(id) }, { $inc: { quantity: -qntSale } })
      : null));

const saleQuantityDelete = async (id, delSale) =>
  getCollection('products').then((products) =>
    (ObjectId.isValid(id) ? products.update({ _id: ObjectId(id) }, { $inc: { quantity: delSale } })
      : null));

module.exports = {
  register,
  getAll,
  updateProduct,
  deleteProducts,
  nameSearch,
  idSearch,
  saleQuantity,
  saleQuantityDelete,
};
