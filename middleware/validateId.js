const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const validateId = rescue(async (req, res, next) => {
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

module.exports = validateId;
