const rescue = require('express-rescue');
const { getByName } = require('../models/productsModels');

module.exports = rescue(async (req, _res, next) => {
  const { name, quantity } = req.body;

  if (name.length < 5) {
    next({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  if (quantity <= 0) {
    next({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (typeof quantity === 'string') {
    throw next({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const nameExists = await getByName(name);
  if (nameExists) {
    next({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  if (!name || !quantity) {
    next({
      err: {
        code: 'invalid_data',
        message: 'Name and quantity are required',
      },
    });
  }
  next();
});
