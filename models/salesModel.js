const getCollection = require('./connection');

const createSales = async (itensSold) => {
  await getCollection('sales')
    .then((sales) => sales.insertMany(itensSold));

  return { itensSold };
};

module.exports = {
  createSales,
};
