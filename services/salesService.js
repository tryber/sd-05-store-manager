const Joi = require('joi');

const salesModel = require('../models/salesModel');

const errorMessage = 'Wrong product ID or invalid quantity';
const errorCode = 'invalid_data';

const validateSale = (sale) => {
  const saleSchema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().min(1).required().messages({
      'number.min': errorMessage,
      'number.base': errorMessage,
    }),
  });
  return saleSchema.validate(sale);
};

const register = async (collectionName, sale) => {
  sale.forEach((element) => {
    const isSaleValid = validateSale(element);
    if (isSaleValid.error) {
      throw {
        message: isSaleValid.error.message,
        code: errorCode,
      };
    }
  });

  return salesModel.register(collectionName, sale);
};

const listAll = async (collectionName) => ({ sales: await salesModel.listAll(collectionName) });

const listById = async (collectionName, id) => {
  const saleById = await salesModel.listById(collectionName, id);

  if (!saleById) {
    throw {
      message: 'Sale not found',
      code: 'not_found',
    };
  }
  return saleById;
};

const update = async (collectionName, id, sale) => {
  sale.forEach((element) => {
    const isUpdateValid = validateSale(element);
    if (isUpdateValid.error) {
      throw {
        message: isUpdateValid.error.message,
        code: errorCode,
      };
    }
  });
  return salesModel.update(collectionName, id, sale);
};

const remove = async (collectionName, id) => {
  const removedSale = await salesModel.remove(collectionName, id);
  if (!removedSale) {
    throw {
      message: 'Wrong sale ID format',
      code: errorCode,
    };
  }
  return removedSale;
};

module.exports = {
  register,
  listAll,
  listById,
  update,
  remove,
};
