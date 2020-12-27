const { ObjectId } = require('mongodb');

const verifySales = async (req, res, next) => {
  const { itemsSold } = req.body;

  itemsSold.forEach(async (item) => {
    // [Será validado que não é possível cadastrar vendas com quantidade menor que/igual a zero]
    if (quantity <= 0) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    //[Será validado que não é possível listar/alterar/deletar uma venda que não existe]
    if (!ObjectId.isValid(item.productId)) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    // requisito 10
    const product = await findByProductId(item.productId);
    const newQuantity = product.quantity - item.quantity;
    if (newQuantity < 0) {
      return res.status(404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }
  });

  next();
};

module.exports = verifySales;
