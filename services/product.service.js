const Joi = require('@hapi/joi');
const connection = require('../models/connection');
const {
  register,
  list,
  update,
  prodDelete,
} = require('../models/product.model');

const getCollection = async (name) => connection(name);

const REGISTER_SCHEMA = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().min(1),
});

const INVALID_DATA = {
  code: 'invalid_data',
  status: 422,
};

const listProduct = async (req, _res, next) => {
  const { id } = req.params;
  try {
    const data = await list({ id });
    if (data.length === 0) throw new Error('Wrong id format');
    req.data = data;
    next();
  } catch ({ message }) {
    next({ ...INVALID_DATA, message });
  }
};

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
    next();
  } catch ({ message }) {
    next({ ...INVALID_DATA, message });
  }
};

const updateProduct = async (req, _res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const { error } = REGISTER_SCHEMA.validate({ name, quantity });
    if (error) throw new Error(error.details[0].message);
    req.data = await update({ id, name, quantity });
    next();
  } catch ({ message }) {
    next({ ...INVALID_DATA, message });
  }
};

const deleteProduct = async (req, _res, next) => {
  const { id } = req.params;
  try {
    const data = await prodDelete(id);
    if (!data) throw new Error('Wrong id format');
    req.data = data;
    next();
  } catch ({ message }) {
    next({ ...INVALID_DATA, message });
  }
};

module.exports = {
  registerProduct,
  listProduct,
  updateProduct,
  deleteProduct,
};
