const productsModel = require('../models/productsModel');

const createProduct = async ({ name, quantity }) => {
  if (name.length < 5) {
    return {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity <= 0) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof quantity === 'string') {
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }

  const productExists = await productsModel.getProductByName(name);
  if (productExists) {
    return {
      code: 'invalid_data',
      message: 'A product already exists',
    };
  }

  const newProduct = await productsModel.createProduct({ name, quantity });
  return newProduct;
};

const getById = async (id) => {
  const productListId = await productsModel.getByProductId(id);
  if (!productListId) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  return productListId;
};

const getAll = async () => {
  await productsModel.getAllProducts();
};

const update = async (id, name, quantity) => {
  const updateId = await productsModel.updateProduct({ id, name, quantity });
  if (name.length < 5) {
    return {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity <= 0) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof quantity === 'string') {
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }

  const productExists = await productsModel.getProductByName(name);
  if (productExists) {
    return {
      code: 'invalid_data',
      message: 'A product already exists',
    };
  }

  if (!id) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return updateId;
};

const deleteId = async (id) => {
  const deleteIt = await productsModel.deleteProduct(id);
  if (!id) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return deleteIt;
};

module.exports = {
  createProduct,
  getById,
  getAll,
  update,
  deleteId,
};
