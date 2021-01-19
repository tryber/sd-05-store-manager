const { Router } = require('express');
const rescue = require('express-rescue');
const products = require('../models/products');

const productsRouter = Router();
const checkProduct = require('../middleware/middleware_products');

productsRouter.post('/', checkProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  // model para conversar com o db
  const product = await products.productCreate(name, quantity);

  return res.status(201).json(product);
}));

/*app.get(
  '/products',
  rescue(async (req, res) => {
    const products = await getAllProducts();

    res.status(200).json(products);
  }),
);
*/

module.exports = productsRouter;
