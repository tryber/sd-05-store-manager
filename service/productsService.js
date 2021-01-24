const { getCollection } = require('../models/connection');
const { productsModel } = require('../models/index');

const validateProduct = async (name, quantity) => {
  const isProductExist = getCollection('products')
    .then((item) => item.findOne({ name }, {}));

  if (name && name.length < 5) {
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

  if (quantity && !Number.isInteger(Number(quantity))) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  if (isProductExist) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return productsModel.createProduct(name, quantity);
};

const validateProductId = async (id) => {
  const result = await productsModel.getProductById(id);

  if (!result) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return result;
};

module.exports = {
  validateProduct,
  validateProductId,
};
