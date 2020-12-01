const pModel = require('../models/productsModel');

const getAll = async () => pModel.getAll();

const validation = async (name, quantity) => {
  if (name.length <= 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  return true;
};

const create = async (name, quantity) => {
  const produtoOk = await validation(name, quantity);
  if (!produtoOk) {
    return false;
  }
  const nomeProd = await pModel.nameProd(name);
  if (nomeProd) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  const novoProd = await pModel.create(name, quantity);
  return novoProd;
};

module.exports = {
  create,
  getAll,
};
