const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insert = async (array) =>
  connection('sales')
    .then((sales) => sales.insertOne({ itensSold: array }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAll = async () => connection('sales').then((sales) => sales.find({}).toArray());

const getById = async (id) =>
  connection('sales').then((sales) => {
    if (ObjectId.isValid(id)) {
      return sales.findOne({ _id: ObjectId(id) });
    }
    return null;
  });

module.exports = {
  insert,
  getAll,
  getById,
};
