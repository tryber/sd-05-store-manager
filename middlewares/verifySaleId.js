const { ObjectId } = require('mongodb');

// [Será validado que não é possível listar/alterar/deletar uma venda que não existe]
const verifySaleId = async (req, res, next) => {
  const { id } = req.params;

  // macetinho do ObjectId.isValid() graças ao consagrado Lipe
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  next();
};

module.exports = verifySaleId;
