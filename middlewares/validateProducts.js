const rescue = require('express-rescue');

const validation = rescue(async (request, response, next) => {
  const { name, quantity } = request.body;

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

  if (!Number.isInteger(Number(quantity))) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  return next();
});

module.exports = {
  validation,
};
