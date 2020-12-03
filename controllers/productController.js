const express = require('express');

const router = express.Router();

const productModel = require('../models/productModel');

router.get('/products', async (_req, res) => {
  const products = await productModel.getAllProducts();
  res.status(200).json({ products });
});

router.get('/produts/:id', async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).json({ product });
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productModel.addProduct(name, quantity);
  return res.status(201).json(product);
});

module.exports = router;
