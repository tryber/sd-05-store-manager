const { Router } = require('express');

const productService = require('../services/productService');

const products = Router();

products.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.create(name, quantity);
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    res.status(500).json('Algo deu errado');
  }
});

products.get('/', async (_req, res) => {
  const productList = await productService.getAllProducts();
  return res.status(200).json({ productList });
});

products.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    res.status(500).json('Algo deu errado');
  }
});

module.exports = products;
