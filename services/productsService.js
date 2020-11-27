const model = require('../models/productsModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const product = await model.getById(id);
  if (!product) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return product;
};

const create = async (name, quantity) => {
  const isProductRegistered = await model.getByName(name);

  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity <= 0) {
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

  if (isProductRegistered) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  return model.create(name, quantity);
};

const update = async (id, name, quantity) => {
  const product = await model.getById(id);

  if (!product) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }

  if (quantity <= 0) {
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

  return model.update(id, name, quantity);
};

const exclude = async (id) => {
  const product = await model.getById(id);

  if (!product) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return model.exclude(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
