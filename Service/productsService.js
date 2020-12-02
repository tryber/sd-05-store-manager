const model = require('../Models/productsModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const product = await model.getById(id);
  if (!product) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }
  return product;
};

const create = async (name, quantity) => {
  const productExists = await model.getByProductName({ name });
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (productExists) {
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
  return model.create(name, quantity);
};

const update = async (name, quantity) => {
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
  return model.update(name, quantity);
};

const remove = async (id) => {
  const product = await model.exclude(id);
  if (!product) {
    throw { code: 'invalid_data', message: 'Wrong id format' };
  }
  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
