const { ObjectId } = require('mongodb');
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
      message: 'Product already exists',
    };
  }

  const newProduct = await productsModel.createProduct({ name, quantity });
  return newProduct;
};

const getById = async (id) => {
  try {
    ObjectId(id);
  } catch (error) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  const productListId = await productsModel.getByProductId(id);
  if (!productListId) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return productListId;
};

const getAll = async () => productsModel.getAllProducts();

const update = async ({ id, name, quantity }) => {
  const updateId = await productsModel.updateProduct({ id, name, quantity });
  if (name.length < 5) {
    console.log('tinha q dar ruim');
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
  if (!productExists) {
    return {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  if (!ObjectId(id)) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return updateId;
};

const deleteId = async (id) => {
  try {
    ObjectId(id);
  } catch (error) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  const deleteIt = await productsModel.deleteProduct(id);
  return deleteIt;
};

module.exports = {
  createProduct,
  getById,
  getAll,
  update,
  deleteId,
};
