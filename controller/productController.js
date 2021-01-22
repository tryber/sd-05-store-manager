const { Router } = require('express');
const { ObjectId } = require('mongodb');
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

productsRouter.get('/', async (_req, res) => {
  const allProducts = await products.getAllProducts();
  if (!allProducts) {
    return res.status(500).json({ message: 'Try Again' });
  }
  return res.status(200).json({ products: allProducts });
});

productsRouter.get('/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  const productById = await products.getProductById(req.params.id);

  if (!productById) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  return res.status(200).json(productById);
});

productsRouter.put('/:id', checkProduct, async (req, res) => {
  const allProducts = await products.getAllProducts();
  const productById = await products.getProductById(req.params.id);

  if (!productById) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  const editProduct = allProducts.map((product) => {
    if (product.id === productById) {
      return { ...req.body, id: productById };
    }
    return product;
  });
  await products.productCreate(editProduct);
  res.status(200).json({ ...req.body, id: productById });
});

productsRouter.delete('/:id', rescue(async (req, res) => {
  try {
      const deleteProduct = await products.deleteProduct.removeProduct(Number(req.params.id));
      res.status(200).json(deleteProduct);
    } catch (err) {
      res.status(422).json({
         err: {
           code: 'invalid_data',
           message: 'Wrong id format',
         }
      })
    };
  }))

module.exports = productsRouter;
