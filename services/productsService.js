// const { ObjectId } = require('mongodb');

const model = require('../models/productsModel');

const create = async (name, quantity) => {
  const productExists = await model.getByProductName({ name });
  if (name.length < 5) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (productExists) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  if (quantity < 0) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (quantity === 0) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (!Number(quantity)) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return model.create(name, quantity);
};

module.exports = {
  create,
};
