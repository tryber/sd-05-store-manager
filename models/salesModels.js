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
  return connection('sales').then((products) => products.findOne({ _id: ObjectId(id) }));
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

const update = (sales, id) => {
  if (!ObjectId.isValid(id)) return null;
  connection('sales').then((sale) =>
    sale.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } }));
};

const exclude = (id) => connection('sales').then((sale) => sale.deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  findById,
  addSale,
  update,
  exclude,
};
