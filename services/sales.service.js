const Joi = require('@hapi/joi');
const { ObjectID } = require('mongodb');
const connection = require('../models/connection');
const {
  register,
  list,
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

// const getCollection = async (name) => connection(name);

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
    if (data.length === 0) throw new Error('Sale not found');
    req.data = data;
    next();
  } catch ({ message }) {
    next({ ...NOT_FOUND, message });
  }
};

module.exports = {
  registerSales,
  listSales,
};