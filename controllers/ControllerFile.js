const list = require('../services/ServiceFile');
const beta = require('../models/ModelFile');

// const result = list('products', beta()).then((res) => res);
const result = async () => {
  const q = await list('products', beta());
  return q;
};

module.exports = result;
