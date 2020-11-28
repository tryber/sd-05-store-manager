const salesServices = require('../models/salesModel');
const productServices = require('./productServices');

const quantIsValid = async (quantity) => {
  if (quantity <= 0 || typeof (quantity) === 'string') {
    throw { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
  return true;
};

const productIdIsValid = async (productId) => {
  // eh pedido em enunciado, mas não é verificado por teste
  // só deveria ser possível adicionar a venda de um produto que existe em products.
  await productServices.getById(productId);
  return true;
};

const create = async (arrayFromBody) => salesServices.create(arrayFromBody);

module.exports = {
  create,
  quantIsValid,
  productIdIsValid,
};
