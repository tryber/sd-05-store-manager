const productModel = require('../models/products');

const createProductValidate = async ({ name, quantity }) => {
  const cpv = await productModel({ name, quantity });
  return cpv;
}

modele.exports = createProductValidate;
