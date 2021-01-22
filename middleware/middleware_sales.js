// const { getByNameProducts } = require('../models/sales');

const checkSale = async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity > 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  if (!Number.isInteger(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  next();
};

module.exports = checkSale;
