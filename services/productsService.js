const Joi = require('joi');

const productsModel = require('../models/productsModel');

const invalidData = 'invalid_data';
const wrongIdFormat = 'Wrong id format';

const validateNameQuantity = (name, quantity) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number()
      .min(1)
      .required()
      .messages({ 'number.min': '"quantity" must be larger than or equal to 1' }),
  });
  return schema.validate({ name, quantity });
};

const register = async (collectionName, name, quantity) => {
  const productExists = await productsModel.findByName(collectionName, name);

  const validation = validateNameQuantity(name, quantity);

  if (productExists) {
    throw {
      message: 'Product already exists',
      code: invalidData,
    };
  }

  if (validation.error) {
    throw {
      message: validation.error.message,
      code: invalidData,
    };
  }

  return productsModel.register(collectionName, name, quantity);
};

const listAll = async (collectionName) => ({
  products: await productsModel.listAll(collectionName),
});

const listById = async (collectionName, id) => {
  const productById = await productsModel.listById(collectionName, id);

  if (!productById) {
    throw {
      message: wrongIdFormat,
      code: invalidData,
    };
  }

  return productById;
};

const update = async (collectionName, id, name, quantity) => {
  const updatedProduct = await productsModel.update(collectionName, id, name, quantity);

  const validation = validateNameQuantity(name, quantity);

  if (validation.error) {
    throw {
      message: validation.error.message,
      code: invalidData,
    };
  }

  return updatedProduct;
};

const remove = async (collectionName, id) => {
  const removedProduct = await productsModel.remove(collectionName, id);

  if (!removedProduct) {
    throw {
      message: wrongIdFormat,
      code: invalidData,
    };
  }

  return removedProduct;
};

module.exports = {
  remove,
  update,
  register,
  listAll,
  listById,
};
