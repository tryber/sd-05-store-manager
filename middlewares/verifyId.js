const { ObjectId } = require('mongodb');

// validadar que não é possível listar, alterar ou deletar um produto que não existe]
const verifyId = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  next();
};

module.exports = verifyId;
