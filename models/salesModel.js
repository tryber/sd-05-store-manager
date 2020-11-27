const { ObjectId } = require('mongodb');
const getCollection = require('./get-Collection');

const addSale = async (itensSold) =>
  getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAll = async () => getCollection('sales').then((sales) => sales.find().toArray());

const findById = async (id) => getCollection('sales').then((sales) => sales.findOne(ObjectId(id)));

const update = async (id, productId, quantity) =>
  getCollection('sales').then((sales) => {
    console.log('model');
    // console.log(id, productId, quantity);
    // https://issue.life/questions/39071359
    return sales.updateOne(
      {
        _id: ObjectId(id),
        'itensSold.productId': productId,
      },
      {
        $set: { 'itensSold.$.quantity': quantity },
      },
    );
  });

const deleteSale = (id) =>
  getCollection('sales').then((sales) => sales.deleteOne({ _id: ObjectId(id) }));

module.exports = { addSale, getAll, findById, update, deleteSale };
