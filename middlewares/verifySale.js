const { ObjectId } = require('mongodb');

const verifySale = async (req, res, next) => {
  const { quantity, productId } = req.body;

  // [Será validado que não é possível cadastrar vendas com quantidade menor que/igual a zero]
  if (quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  // [Será validado que não é possível cadastrar vendas com uma string no campo quantidade]
  if (!Number.isInteger(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  if (!ObjectId.isValid(productId)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  next();
};

module.exports = verifySale;
