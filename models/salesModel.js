const { ObjectId } = require('mongodb');
const { getCollection } = require('./connection');

const connect = getCollection('sales');

const createSale = async (id, quantity) => {
  const result = await connect.then((item) =>
    item.insertOne({
      itensSold: [{
        productId: ObjectId(id),
        quantity,
      }],
    }));

  return { _id: result.insertedId, itensSold: [{ productId: id, quantity }] };
};

module.exports = {
  createSale,
};
