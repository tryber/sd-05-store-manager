const { ObjectID } = require('mongodb');
const { salesEnums } = require('../enumerators');
const getCollection = require('./connection');

const getSales = async (id) => {
  let result;
  if (id) {
    result = await getCollection(salesEnums.table).then((db) => db.findOne(ObjectID(id)));
  } else {
    result = {
      sales: await getCollection(salesEnums.table).then((db) => db.find().toArray()),
    };
  }
  return result;
};

const createSale = async (items) => {
  const sales = {
    itensSold: items,
  };
  const newSale = await getCollection(salesEnums.table).then((db) => db.insertOne(sales));
  return { _id: newSale.insertedId, ...sales };
};

module.exports = {
  getSales,
  createSale,
};
