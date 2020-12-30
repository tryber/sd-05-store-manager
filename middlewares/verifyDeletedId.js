const { ObjectId } = require('mongodb');

// [Será validado que não é possível listar, alterar, ou deletar uma venda que não existe]
const verifyDeletedId = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id) || id.length !== 24) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  next();
};

module.exports = verifyDeletedId;
