const express = require('express');
const rescue = require('express-rescue');
const { shared, products } = require('../models/index');
const { validateProduct, validateProductId } = require('../middleware/index');

const productController = express.Router();

productController.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const addProduct = await products.add('products', { name, quantity });

  res.status(201).json(addProduct);
}));

productController.get('/', rescue(async (_, res) => {
  const findAllProducts = await shared.findAll('products');

  res.status(200).json({ products: findAllProducts });
}));

productController.get('/:id', validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const findProduct = await shared.findById('products', id);

  res.status(200).json(findProduct);
}));

productController.put('/:id', validateProduct, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await products.update('products', id, { name, quantity });

  res.status(200).json(updatedProduct);
}));

productController.delete('/:id', validateProductId, rescue(async (req, res) => {
  const { id } = req.params;
  const excludedProduct = await products.exclude('products', id);

  res.status(200).json(excludedProduct);
}));

module.exports = productController;
