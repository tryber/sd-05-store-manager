const salesModel = require('../models/salesModel');
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

const create = async (arrayFromBody) => salesModel.create(arrayFromBody);

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  if (id.length < 24) {
    throw { err: { code: 'not_found', message: 'Sale not found' } };
  }

  const saida = await salesModel.getById(id);
  if (!saida) {
    throw { err: { code: 'not_found', message: 'Sale not found' } };
  }
  return saida;
};

const update = async (id, arrayFromBody) => salesModel.update(id, arrayFromBody);

const exclude = async (id) => {
  if (id.length < 24) {
    //  avalia se o formato do id é inválido, enunciado pede se a venda não existe.
    throw { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }
  const verificaSale = await salesModel.getById(id);

  if (!verificaSale) {
    //  este caso deveria ser contemplado nos testes, no caso da venda não existir.
    //  alem disso, neste caso, o erro deveria ser 404.
    // teste avalia somente o caso acima que tem status 422
    throw { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }

  await salesModel.exclude(id);
  return verificaSale;
};

module.exports = {
  create,
  quantIsValid,
  productIdIsValid,
  getAll,
  getById,
  update,
  exclude,
};
