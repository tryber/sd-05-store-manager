const model = require('../models/productsModel');

/* const catchError = (name, quantity) => {
  if (name.length < 5) {
    throw { code: "invalid_data", message: "\"name\ length must be at least 5 characters long" }
  }
  if (quantity <= 0) {
    throw { code: "invalid_data", message: "\"quantity\ must be larger the or equal to 1" }
  }
  if (typeof quantity === 'string') {
    throw { code: "invalid_data", message: "\"quantity\ must be a number" }
  }
} */

const getAll = async () => await model.getAll();

const getById = async (id) => {
  const product = await model.getById(id);
  if (!product) {
    throw { err: { code: 'invalid_data', message: `Wrong id format` } };
  }

  return product;
};

const insert = async (name, quantity) => {
  const found = await model.getByName(name);
  if (found) {
    throw { err: { code: "invalid_data", message: "Product already exists" } }
  }
  if (name.length < 5) {
    throw { err: { code: "invalid_data", message: "\"name\ length must be at least 5 characters long" }}
  }
  if (quantity <= 0) {
    throw { err: { code: "invalid_data", message: "\"quantity\ must be larger the or equal to 1" }}
  }
  if (typeof quantity === 'string') {
    throw { err: { code: "invalid_data", message: "\"quantity\ must be a number" }}
  }
  return model.insert(name, quantity)
}

const update = async (id, name, quantity) => {
  if (name.length < 5) {
    throw { err: { code: "invalid_data", message: "\"name\ length must be at least 5 characters long" }}
  }
  if (quantity <= 0) {
    throw { err: { code: "invalid_data", message: "\"quantity\ must be larger the or equal to 1" }}
  }
  if (typeof quantity === 'string') {
    throw { err: { code: "invalid_data", message: "\"quantity\ must be a number" }}
  }
  const product = await model.update(id, name, quantity)
  if (!product) {
    throw { err: { code: 'invalid_data', message: `Wrong id format` }};
  }
  return product;
}

const exclude = async (id) => {
  const product = await model.exclude(id)
  if (!product) {
    throw { err: { code: 'invalid_data', message: `Wrong id format` }};
  }
  return product;
}

module.exports = {
  exclude,
  update,
  insert,
  getById,
  getAll,
}
