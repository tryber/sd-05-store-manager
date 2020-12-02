/* const model = require('../Models/salesModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const sale = await model.getById(id);
  if (!sale) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }
  return sale;
};

const create = async (productId, quantity) => {
  const saleExists = await model.getByproductId({ productId });
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (saleExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  if (quantity < 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (quantity === 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (!Number(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return model.create(productId, quantity);
};

const update = async (productId, quantity) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (quantity < 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (quantity === 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (!Number(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return model.update(productId, quantity);
};

const remove = async (id) => {
  const sale = await model.exclude(id);
  if (!sale) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
 */