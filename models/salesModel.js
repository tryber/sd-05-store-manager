const { ObjectId } = require('mongodb');
const connection = require('./connections');

const getAllSales = async () => connection('sales').then((sales) => sales.find().toArray());

const cadastro = async (arr) => {
  connection('sales').then((sales) =>
    sales.insertOne({ itensSold: [...arr] }).then((result) => ({
      _id: result.insertedId,
      itensSold: [...arr],
    })));
};

const searchSaleById = async (id) =>
  connection('sales').then((sales) => (ObjectId.isValid(id) ? sales.findOne({ _id: ObjectId(id) }) : null));

const updateSale = async (id, arr) =>
  connection('sales').then((sales) => (ObjectId.isValid(id) ? sales.update({ _id: ObjectId(id) }, { itensSold: arr }) : null));

module.exports = { cadastro, searchSaleById, getAllSales, updateSale };
