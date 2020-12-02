const model = require('../models/sales');

const create = async (salesField) => {
  if (salesField[0].quantity < 1 || typeof salesField[0].quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  return model.create(salesField);
};
module.exports = {
  create,
};
