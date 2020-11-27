const { validateProductId, validateSaleId, validateDeleteId } = require('./validateId');
const validateProduct = require('./validateProduct');
const validateSale = require('./validateSale');

module.exports = {
  validateProductId,
  validateSaleId,
  validateProduct,
  validateSale,
  validateDeleteId,
};
