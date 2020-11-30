const { ObjectId } = require('mongodb');
const { product } = require('../models');

const checkName = (name) => {
  if (name.length >= 5) return true;

  return false;
};

const checkQuantity = (quantity) => {
  if (parseInt(quantity, 10) > 0) return true;

  return false;
};

const insertProduct = async (name, quantity) => {
  const checkExistence = await product.getProduct(name);

  if (!checkName(name)) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }

  if (!checkQuantity(quantity)) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  if (checkExistence !== null) {
    return {
      err: { code: 'invalid_data', message: 'Product already exists' },
    };
  }

  const result = await product.insertProduct(name, quantity);
  return result;
};

const getById = async (id) => {
  if (id.length < 12) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  const answer = await product.getProductById(id);

  if (answer === null) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  return answer;
};

const getAll = async () => product.getAllProducts();

const updateOneProduct = async (id, name, quantity) => {
  if (!checkName(name)) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    };
  }

  if (!checkQuantity(quantity)) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  await product.updateProduct(id, name, quantity);

  return { _id: ObjectId(id), name, quantity };
};

const deleteOneProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: { code: 'invalid_data', message: 'Wrong id format' },
    };
  }
  const productDeleted = await product.getProductById(id);
  await product.deleteProduct(id);

  return productDeleted;
};

module.exports = {
  insertProduct,
  getById,
  getAll,
  updateOneProduct,
  deleteOneProduct,
};
