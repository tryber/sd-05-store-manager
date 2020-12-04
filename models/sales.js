const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection('sales').then((db) => db.find().toArray());

const getById = async (id) => connection('sales').then((db) => db.findOne(ObjectId(id)));

const createSale = async (itensSold) =>
  connection('sales')
    .then((db) => db.insertOne({ itensSold }))
    .then((result) => result.ops[0]);

const updateSale = async (id, itensSold) => {
  connection('sales').then((db) => db.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return { _id: id, itensSold };
};

const deleteSale = async (id) =>
  connection('sales').then((db) => db.deleteOne({ _id: ObjectId(id) }));

module.exports = { getAll, createSale, getById, updateSale, deleteSale };
