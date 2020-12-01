// const { objectId } = require('mongodb');
const { productsEnums } = require('../enumerators');
const getCollection = require('./connection');

const getProductByName = async (name) => {
  const product = await getCollection(productsEnums.table).then((db) =>
    db.findOne({ name }));
  return product;
};

const create = async (name, quantity) => {
  const newProduct = await getCollection(productsEnums.table).then((db) =>
    db.insertOne({ name, quantity }));
  return { _id: newProduct.insertedId, name, quantity };
};

module.exports = { create, getProductByName };
