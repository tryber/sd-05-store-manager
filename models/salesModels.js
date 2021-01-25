const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const register = async (arr) => {
  getCollection('sales').then((sales) =>
    sales.insertOne({ itensSold: [...arr] }).then((result) => ({
      _id: result.insertedId,
      itensSold: [...arr],
    })));
};

const getAllSales = async () => getCollection('sales').then((sales) => sales.find().toArray());

const searchSaleById = async (id) =>
  getCollection('sales').then((sales) =>
    (ObjectId.isValid(id) ? sales.findOne({ _id: ObjectId(id) }) : null));

const updateSale = async (id, arr) =>
  getCollection('sales').then((sales) =>
    (ObjectId.isValid(id) ? sales.update({ _id: ObjectId(id) }, { itensSold: arr }) : null));

const deleteSale = async (id) =>
  getCollection('sales').then((sales) =>
    (ObjectId.isValid(id) ? sales.deleteOne({ _id: ObjectId(id) }) : null));

module.exports = {
  register,
  getAllSales,
  searchSaleById,
  updateSale,
  deleteSale,
};
