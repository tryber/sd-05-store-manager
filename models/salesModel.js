const getCollection = require('./connection');

const registerSale = async (itensSold) => {
  const createSale = await getCollection('sales')
    .then((sales) => sales.insertOne({ itensSold }));

  return { _id: createSale.insertedId, itensSold };
};

module.exports = {
  registerSale,
};
