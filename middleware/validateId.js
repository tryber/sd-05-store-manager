const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const validateProductId = rescue(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  next();
});

const validateSaleId = rescue(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  next();
});

module.exports = { validateProductId, validateSaleId };
