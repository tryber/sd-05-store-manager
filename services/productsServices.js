const productsModels = require('../models/productsModels');

const createProduct = async (name, quantity) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (typeof quantity === 'string') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
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

  if (!name || !quantity) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Name and quantity are required',
      },
    };
  }
  return productsModels.create({ name, quantity });
};

const getAllProducts = async () => productsModels.getAll();

const getByIdProducts = async (id) => {
  const product = await productsModels.getById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
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
