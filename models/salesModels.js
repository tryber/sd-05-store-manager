const { objectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () =>
  getConnection('sales').then((sales) =>
    sales.find({}).toArray());

const getById = async (id) =>
  getConnection('sales').then((sales) =>
    (objectId.isValid(id) ? sales.findOne({ _id: objectId(id) }) : null));

const create = async ({ sale }) =>
  getConnection('sales').then((sales) =>
    sales.insertOne({ sale })
      .then((results) => ({
        _id: results.insertedId,
        itemSold: [results.itensSold],
      })));

const exclude = async (id) => {
  getConnection('sales').then((sales) =>
    sales.deleteOne({ _id: objectId(id) }));
};

const update = async (id, sale) => {
  if (!objectId.isValid(id)) return;
  await getConnection('products').then((sales) => sales.updateOne({ _id: objectId(id) }, { $set: sale }));
};

module.exports = {
  getAll,
  getById,
  create,
  exclude,
  update,
};

// A resposta do insert deve retornar após a criação é essa:

// { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }
// A resposta do insert deve retornar após a criação é essa:

// {
//   "_id": ObjectId("5f43cc53c45ff5104986e81e"),
//   "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }]
