const Joi = require('@hapi/joi');
const connection = require('../models/connection');
const { register } = require('../models/product.model');

const REGISTER_SCHEMA = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().min(1),
});

const INVALID_DATA = {
  code: 'invalid_data',
  status: 422,
};

const getCollection = async (name) => connection(name);

const registerProduct = async (req, _res, next) => {
  const { name, quantity } = req.body;
  try {
    const { error } = REGISTER_SCHEMA.validate({ name, quantity });
    if (error) throw new Error(error.details[0].message);
    const collection = await getCollection('products');
    if (await collection.findOne({ name })) {
      next({ ...INVALID_DATA, message: 'Product already exists' });
      return;
    }
    req.data = await register({ name, quantity });
  } catch ({ message }) {
    next({ ...INVALID_DATA, message });
  }
};

module.exports = { registerProduct };
