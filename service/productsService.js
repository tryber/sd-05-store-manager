const rescue = require('express-rescue');
const { getCollection } = require('../models/connection');

const validateProduct = rescue(async (request, response, next) => {
  const { name, quantity } = request.body;

  const isProductExist = await getCollection('products')
    .then((item) => item.findOne({ name }, {}));

  if (name && name.length < 5) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  if (quantity <= 0) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (quantity && !Number.isInteger(Number(quantity))) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (isProductExist) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  return next();
});

module.exports = { validateProduct };
