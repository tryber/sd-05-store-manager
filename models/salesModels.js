// salemodel
const { ObjectId } = require('mongodb');

const getConnection = require('./connection');

const create = async (itensSold) => getConnection('sales')
  .then((sales) => sales.insertOne({ itensSold }))
  .then((result) => (result.ops[0]
  ));
//
const getAll = async () => getConnection('sales')
  .then((sales) => sales.find({}).toArray());

const getById = async (id) => {
  const saleID = Number(id);
  await getConnection('sales').then((sales) => (ObjectId
    .isValid(saleID) ? sales.findOne({ _id: ObjectId(saleID) }) : null));
};

module.exports = {
  create,
  getAll,
  getById,
};
