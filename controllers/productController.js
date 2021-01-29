const { Router} = require('express');

const productService = require('../services/productService');

const productRoute = Router();

productRoute.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productService.createProduct(name, quantity);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(201).json(product);
  }),
);

productRoute.get(
  '/',
  async (req, res) => {
    const { name, quantity } = req.body;
    cosnt product = await productService.getAllProducts(name, quantity);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);

productRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductsById(id);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);

productRoute.put(
  '/:id',
  async (req, res) => {
    const { id } = req.body;
    const product = await productService.updateProduct(id);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);

productRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.updateProduct(id);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  }
);

module.exports = router;
