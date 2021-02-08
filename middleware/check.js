const { getAll } = require('../models/productsModel');

const checkProduct = async (req, res, next) => {
  const sales = req.body;
  const allProducts = await getAll();

  const products = allProducts.reduce((obj, product) => {
    const { _id: id } = product;
    return { ...obj, [id]: product.quantity };
  }, {});
  let sold = false;
  sales.forEach((product) => {
    if (products[product.productId] - product.quantity < 0) {
      sold = true;
    }
  });

  if (sold) {
    return res.status(404).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    });
  }
  next();
};

module.exports = checkProduct;
