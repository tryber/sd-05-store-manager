const getCollection = require('./connection');

const createSales = async (itensSold) => {
  const insertSales = await getCollection('sales')
    .then((sales) => sales.insertMany(itensSold));

  return { insertSales };
};

module.exports = {
  createSales,
};
