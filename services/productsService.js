const { ObjectId } = require('mongodb');

const productModel = require('../models/productsModel');

const validationData = (name, quantity) => {
  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  // if (chosenProduct) {
  //   throw {
  //     code: 'invalid_data',
  //     message: 'Product already exists',
  //   };
  // }

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
const create = async (name, quantity) => {
  const productAlreadyExists = await productModel.findByName(name);

  // if (name.length < 5) {
  //   throw {
  //     code: 'invalid_data',
  //     message: '"name" length must be at least 5 characters long',
  //   };
  // }

  if (productAlreadyExists) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  // if (+quantity < 1) {
  //   throw {
  //     code: 'invalid_data',
  //     message: '"quantity" must be larger than or equal to 1',
  //   };
  // }

  // if (typeof quantity !== 'number') {
  //   throw {
  //     code: 'invalid_data',
  //     message: '"quantity" must be a number',
  //   };
  // }

  validationData(name, quantity);

  return productModel.create(name, quantity);
};

const getById = async (id) => {
  const productDoesExist = await productModel.findById(id);

  if (!ObjectId.isValid(id) || !productDoesExist) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  // if (!productDoesExist) {
  //   throw {
  //     code: 'invalid_data',
  //     message: 'Wrong id format',
  //   };
  // }

  return productDoesExist;
};

const getAll = async () => productModel.getAll();

const updateById = async (id, name, quantity) => {
  validationData(name, quantity);
  await productModel.updateById(id, name, quantity);
  // console.log(updatedProduct);
  return { _id: ObjectId(id), name, quantity };
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
};
