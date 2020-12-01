const productsModels = require('../models/productsModels');

const createProduct = async (name, quantaty) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (quantaty <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantaty" must be larger than or equal to 1',
      },
    };
  }

  if (typeof quantaty === 'string') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantaty" must be a number',
      },
    };
  }

  const nameExists = await productsModels.getByName(name);
  if (nameExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return productsModels.create({ name, quantaty });
};

const getAllProducts = async () => productsModels.getAll();

const getByIdProducts = async (id) => {
  const product = await productsModels.getById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrond id format',
      },
    };
  }
  return product;
};

module.exports = {
  getAllProducts,
  getByIdProducts,
  createProduct,
};
