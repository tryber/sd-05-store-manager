const getCollection = require('./get-collection');

const create = async (sales) => {
  const sale = await getCollection('products').then((collection) => collection.insertOne({
    itensSold: sales,
  }));
  return {
    _id: sale.insertedId,
    itensSold: sales,
  };
};

module.exports = {
  create,
};
