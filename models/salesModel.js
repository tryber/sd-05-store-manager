const { ObjectId } = require('mongodb');
const getCollection = require('./get-Collection');

const addSale = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAll = async () => getCollection('sales').then((sales) => sales.find().toArray());

const findById = async (id) => {
  // console.log('entrou no model find id');
  return getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));
};

module.exports = { addSale, getAll, findById };
