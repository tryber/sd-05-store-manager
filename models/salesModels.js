const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection('sales')
    .then((sales) => sales.find().toArray())
    .then((result) => ({
      sales: result,
    }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection('sales').then((products) => products.findOne({ _id: `${id}` })); // rever isso aqui pq o ObjectId não está funcionando
};

const addSale = (sales) =>
  connection('sales')
    .then((sale) =>
      sale.insertOne({
        itensSold: sales,
      }))
    .then((result) => ({
      _id: result.insertedId,
      itensSold: sales,
    }));

module.exports = {
  getAll,
  findById,
  addSale,
};
