const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const validateSale = rescue(async (req, res, next) => {
  req.body.forEach(({ quantity, productId }) => {
    if (quantity <= 0 || !Number.isInteger(quantity) || !ObjectId.isValid(productId)) {
      res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });

  next();
});

module.exports = validateSale;
