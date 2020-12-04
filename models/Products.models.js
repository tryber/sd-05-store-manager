const { ObjectId } = require('mongodb');
const { productsEnums } = require('../enumerators');
const getCollection = require('./connection');

const getProducts = async (id) => {
  let products;
  if (id) {
    products = await getCollection(productsEnums.table).then((db) => db.findOne(ObjectId(id)));
  } else {
    products = {
      products: await getCollection(productsEnums.table).then((db) => db.find().toArray()),
    };
  }

  return products;
};

const getProductByName = async (name) => {
  const product = await getCollection(productsEnums.table).then((db) => db.findOne({ name }));
  return product;
};

const create = async (name, quantity) => {
  const newProduct = await getCollection(productsEnums.table).then((db) =>
    db.insertOne({ name, quantity }));
  return { _id: newProduct.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  await getCollection(productsEnums.table)
    .then((db) => db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { _id: Object(id), name, quantity };
};

const removeProduct = async (id) => {
  const newProduct = await getCollection(productsEnums.table).then((db) =>
    db.deleteOne({ _id: ObjectId(id) }));
  return newProduct;
};

module.exports = { create, getProductByName, getProducts, updateProduct, removeProduct };
