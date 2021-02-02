const { Router } = require('express');

const productService = require('../services/productService');

const productRoute = Router();
// Checked
productRoute.get(
  '/',
  async (_req, res) => {
    const products = await productService.getAllProducts();
    res.status(200).json({ products });
  },
);
// Checked
productRoute.post(
  '/',
  async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productService.createProduct(name, quantity);
    if (product.err) return res.status(422).json(product);
    res.status(201).json(product);
    console.log(product);
  },
);
// Checked
productRoute.get(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductsById(id);
    if (!product) res.status(422).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  },
);
// Checked
productRoute.put(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productService.updateProduct(id, name, quantity);
    if (product.err) return res.status(422).json(product);
    res.status(200).json(product);
  },
);
// Doesnt work
productRoute.delete(
  '/:id',
  async (req, res) => {
    const { id } = req.params;
    const product = await productService.deleteProduct(id);
    console.log(product);
    if (!product) return res.status(422).json({ message: 'Dados inválidos' });
    res.status(200).json(product);
  },
);

module.exports = productRoute;
