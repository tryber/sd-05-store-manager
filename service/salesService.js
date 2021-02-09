const { getProductById } = require('../models/productsModel');
const { createSale } = require('../models/salesModel');

const createSaleValidation = async (query) => {
  const getByID = query.map(async (e) => getProductById(e.productId));
  const validateId = getByID.some((e) => !e);

  if (validateId) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  const result = query.map(async ({ productId, quantity }) => createSale(productId, quantity));
  return result[0];
};

module.exports = {
  createSaleValidation,
};
