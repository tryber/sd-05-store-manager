const { ObjectId } = require('mongodb');

const productModel = require('../models/productsModel');

const validationData = (name, quantity) => {
  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (+quantity < 1) {
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
};

const isThisIdValid = async (id, productDoesExist) => {
  if (!ObjectId.isValid(id) || !productDoesExist) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
};

const create = async (name, quantity) => {
  const productAlreadyExists = await productModel.findByName(name);

  validationData(name, quantity);

  if (productAlreadyExists) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const newProduct = await productModel.create(name, quantity);

  return newProduct;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const productDoesExist = await productModel.getById(id);

  if (!productDoesExist) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  // await isThisIdValid(id, productDoesExist);

  return productDoesExist;
};

const getAll = async () => productModel.getAll();

const updateById = async (id, name, quantity) => {
  validationData(name, quantity);
  await productModel.updateById(id, name, quantity);
  const updatedProduct = { _id: ObjectId(id), name, quantity };

  return updatedProduct;
};

const remove = async (id) => {
  const productDoesExist = await productModel.getById(id);
  await isThisIdValid(id, productDoesExist);
  const deletedProduct = await productModel.remove(id);
  return deletedProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  updateById,
};
