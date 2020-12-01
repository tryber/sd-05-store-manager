const { objectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () =>
  getConnection('products').then((products) =>
    products.find({}).toArray());

const getById = async (id) =>
  getConnection('products').then((products) =>
    (objectId.isValid(id) ? products.findOne({ _id: objectId(id) }) : null));

const create = async (name, quantaty) =>
  getConnection('products').then((products) =>
    products.insertOne({ name, quantaty })
      .then((results) => ({
        _id: results.insertedId,
        name,
        quantaty,
      })));

const exclude = async (id) => {
  getConnection('products').then((products) =>
    products.deleteOne({ _id: objectId(id) }));
};

const update = async (id, name, quantaty) => {
  if (!objectId.isValid(id)) return;
  await getConnection('products').then((products) => products.updateOne({ _id: objectId(id) }, { $set: name, quantaty }));
};

module.exports = {
  getAll,
  getById,
  create,
  exclude,
  update,
};

// A tabela de produtos deverá ter o seguinte nome: products

// Os campos da tabela products terão esse formato:

// { "name": "Produto Silva", "quantity": 10 }
// A resposta do insert deve retornar após a criação é essa:

// { "_id": ObjectId("5f43cbf4c45ff5104986e81d"), "name": "Produto Silva", "quantity": 10 }