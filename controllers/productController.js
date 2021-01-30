const { Router } = require('express');

const productService = require('../services/productService');

const productRoute = Router();

const errorMessage = (code, message) => ({ err: { code, message } });

productRoute.post(
  '/',
  async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productService.createProduct(name, quantity);
    if (!product) res.status(422).json({ message: 'Dados inválidos' });
    res.status(201).json(product);
  },
);

productRoute.get(
  '/',
  async (_req, res) => {
    const products = await productService.getAllProducts();
    if (!products) res.status(422).res.status(400).err(errorMessage('invalid_data', 'wrong id format'));
    res.status(201).json(products);
  },
);

productRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductsById(id);
    if (!product) res.status(422).res.status(400).err(errorMessage('invalid_data', 'wrong id format'));
    res.status(200).json(product);
  },
);

productRoute.put(
  '/:id',
  async (req, res) => {
    const { id } = req.body;
    const product = await productService.updateProduct(id);
    if (!product) res.status(400).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  },
);

productRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.deleteProduct(id);
    if (!product) res.status(400).err(errorMessage('invalid_data', 'wrong id format'));
    res.status(200).json(product);
  },
);

module.exports = productRoute;
