// camada situada entre controller e model
// Responsável pela logica de negocio
const productModel = require('../models/produtosModel');

const createProductValidate = async ({ name, quantity }) => {
  const cpv = await productModel({ name, quantity });
  return cpv;
}

module.exports = createProductValidate;
