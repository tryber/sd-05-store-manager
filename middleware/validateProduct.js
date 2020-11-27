const rescue = require('express-rescue');
const { products } = require('../models/index');

const validateProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  if (name && name.length < 5) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  if (quantity <= 0) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (quantity && !Number.isInteger(quantity)) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const productExists = await products.findByName('products', name);

  if (productExists) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  next();
});

module.exports = validateProduct;
