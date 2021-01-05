const { ObjectId } = require('mongodb');
const connection = require('./connections');

const getAll = async () => connection('products').then((products) => products.find({}).toArray());

const cadastro = async (name, quantity) => {
  connection('products').then((products) =>
    products.insertOne({ name, quantity }).then((result) => ({
      _id: result.insertedId,
      name,
      quantity,
    })));
};

const deleteProducts = async (id) =>
  connection('products').then((products) => (ObjectId.isValid(id) ? products.deleteOne({ _id: ObjectId(id) }) : null));

const idSearch = async (id) =>
  connection('products').then((products) => (ObjectId.isValid(id) ? products.findOne({ _id: ObjectId(id) }) : null));

const editProduct = async (name, quantity, id) => {
  connection('products').then((products) =>
    (ObjectId.isValid(id) ? products.update({ _id: ObjectId(id) }, { $set: { name, quantity } })
      : null));
};

const saleQuantity = async (id, saleD) =>
  connection('products').then((products) =>
    (ObjectId.isValid(id) ? products.update({ _id: ObjectId(id) }, { $inc: { quantity: -saleD } })
      : null));

const saleQuantityDelete = async (id, saleI) =>
  connection('products').then((products) =>
    (ObjectId.isValid(id) ? products.update({ _id: ObjectId(id) }, { $inc: { quantity: saleI } })
      : null));

const nameSearch = async (name) =>
  connection('products').then((products) => products.find({ name }).toArray());

module.exports = {
  getAll,
  cadastro,
  nameSearch,
  idSearch,
  editProduct,
  deleteProducts,
  saleQuantity,
  saleQuantityDelete,
};
