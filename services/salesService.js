const model = require('../models/salesModel');

const create = async (sales) => {
  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].quantity <= 0) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (typeof sales[i].quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  }
  return model.create(sales);
};

module.exports = {
  create,
};
