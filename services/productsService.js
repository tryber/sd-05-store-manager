const { ObjectId } = require('mongodb');

const model = require('../models/productsModel');

const getAll = async () => model.getAll();

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

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  const product = await model.getById(id);
  if (!product) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return product;
};

const update = async (id, name, quantity) => {
  if (name.length < 5) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (quantity < 0) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (quantity === 0) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (!Number.isInteger(quantity)) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return model.update(id, name, quantity);
};

const exclude = async (id) => {
  const product = await model.exclude(id);
  if (!product) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
