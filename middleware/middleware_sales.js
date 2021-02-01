// const { getByNameProducts } = require('../models/sales');

const checkSale = async (req, res, next) => {
  const sales = req.body;

  if (sales.length === 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'There is no sale',
      },
    });
  }

  if (!sales.map((sale) => sale.quantity).every((quantity) => quantity > 0)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  if (!sales.map((sale) => sale.quantity).every((quantity) => Number.isInteger(quantity))) {
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
