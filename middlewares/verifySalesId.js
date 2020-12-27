const { ObjectId } = require('mongodb');
const { findBySaleId } = require('../models');

// [Será validado que não é possível listar/alterar/deletar uma venda que não existe]
const verifySalesId = async (req, res, next) => {
  const { id } = req.params;
  const verifyIdExistence = await findBySaleId(id);

  if (!ObjectId.isValid(id) || !verifyIdExistence) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  next();
};

module.exports = verifySalesId;
