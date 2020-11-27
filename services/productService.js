const model = require('../models/productsModel');

const getAll = async () => model.getAllProducts();

const getById = async (id) => {
  if (!id) {
    return {
      error: true,
      code: 'invalid data',
      message: '"id" should exist',
    };
  }
  const product = await model.getProductsById(id);

  if (!product) {
    return {
      error: true,
      code: 'invalid_data',
      message: `Wrong id format`,
    };
  }

  return product;
};

const create = async ({ name, quantity }) => {
  if (!name) {
    return {
      error: true,
      code: 'invalid data',
      message: '"name" should exist',
    };
  }
  if (name.length < 5) {
    return {
      error: true,
      code: 'invalid data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (!quantity || (typeof quantity !== 'number')) {
    return {
      error: true,
      code: 'invalid data',
      message: '"quantity" must be a number',
    };
  }
  if (quantity < 1) {
    return {
      error: true,
      code: 'invalid data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  const productExists = await model.getProductByName({ name });
  if (productExists) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  const newProduct = await model.createProducts({ name, quantity });

  return newProduct;
};

const update = async () => model.updateProducts({ id, name, quantity });

module.exports = {
  getAll,
  getById,
  create,
  update,
};
