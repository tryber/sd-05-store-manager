const { ObjectId } = require('mongodb');
const rescue = require('express-rescue');
const shared = require('../models/shared');

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
  const idExists = await shared.findById('sales', id);

  if (!ObjectId.isValid(id) || !idExists) {
    res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  next();
});

const validateDeleteId = rescue(async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id) || id.length !== 24) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  next();
});

module.exports = { validateProductId, validateSaleId, validateDeleteId };
