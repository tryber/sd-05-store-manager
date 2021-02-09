const Joi = require('@hapi/joi');
const { ObjectID } = require('mongodb');
// const { ObjectID } = require('mongodb');
// const connection = require('../models/connection');
const {
  register,
  list,
  update,
  saleDelete,
} = require('../models/sales.model');

const REGISTER_SCHEMA = Joi
  .array()
  .items(Joi.object({
    productId: Joi.string(),
    quantity: Joi.number().min(1),
  }));

const INVALID_DATA = {
  code: 'invalid_data',
  status: 422,
};

const NOT_FOUND = {
  code: 'not_found',
  status: 404,
};

const registerSales = async (req, _res, next) => {
  const itensSold = req.body;
  try {
    const { error } = await REGISTER_SCHEMA.validate(itensSold);
    if (error) throw new Error();
    req.data = await register(itensSold);
    next();
  } catch {
    next({ ...INVALID_DATA, message: 'Wrong product ID or invalid quantity' });
  }
};

const listSales = async (req, _res, next) => {
  const { id } = req.params;
  try {
    const data = await list({ id });
    if (!data || data.length === 0) throw new Error('Sale not found');
    req.data = data;
    next();
  } catch ({ message }) {
    next({ ...NOT_FOUND, message });
  }
};

const updateSale = async (id, name, quantity) => {
  if (!id) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  if (!ObjectID.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  if (!name) {
    throw {
      code: 'invalid_data',
      message: '"name" should exist',
    };
  }
  if (name.length <= 5) {
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
  if (!quantity || (typeof quantity !== 'number') || !Number.isInteger(quantity)) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  await update(id, name, quantity);

  return { name, quantity };
};

const deleteSale = async (req, _res, next) => {
  const { id } = req.params;
  try {
    const data = await saleDelete(id);
    if (!data) throw new Error('Wrong sale ID format');
    req.data = data;
    next();
  } catch ({ message }) {
    next({ ...INVALID_DATA, message });
  }
};

module.exports = {
  registerSales,
  listSales,
  updateSale,
  deleteSale,
};
