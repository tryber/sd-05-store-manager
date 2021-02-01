// Bônus 10. Valiar a quantidade de produtos
const { getAllProducts } = require('../models/products');

const productQuantity = async (req, res, next) => {
  const saleProduct = req.body;
  const allProducts = await getAllProducts();

  const productsObj = allProducts.reduce((obj, product) => {
    const { _id: id } = product;
    return { ...obj, [id]: product.quantity };
  }, {});

  let doNotSell = false;

  saleProduct.forEach((product) => {
    if ((productsObj[product.productId] - product.quantity) < 0) {
      doNotSell = true;
    }
  });

  if (doNotSell) {
    return res.status(404).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    });
  }

  next();
};

module.exports = productQuantity;

/*
productsObj: {
  "6011dc5f713f394b79a70ac7": 1,
  "6011dc68713f394b79a70ac8": 2,
  "6011dc80713f394b79a70ac9": 4,
}
productsObj[variavelId]
*/
