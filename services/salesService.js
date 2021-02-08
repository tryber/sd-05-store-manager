const { ObjectId } = require('mongodb');
const model = require('../models/salesModels');

const getAll = async () => model.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const sale = await model.getById(id);
  if (!sale) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return sale;
};

const create = async (body) => {
  body.forEach(({ productId, quantity }) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
    if (!ObjectId.isValid(productId)) {
      throw {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      };
    }
  });
  return model.create(body);
};

const update = async (id, body) => {
  body.forEach(({ productId, quantity }) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
    if (!ObjectId.isValid(productId)) {
      throw {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      };
    }
  });
  return model.update(id, body);
};

const exclude = async (id) => {
  const sale = await model.exclude(id);
  if (!sale) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
