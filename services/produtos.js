const productsModels = require('../models/products');

const createProductValidate = async ({name, quantity}) => {
  const cpv = await productsModels({name, quantity});
  return cpv; 
}

module.exports = createProductValidate;
