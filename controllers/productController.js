const express = require('express');
const rescue = require('express-rescue');
const products = require('../models/products');
const validateProduct = require('../middleware/productValidation');
const validateId = require('../middleware/idValidation');

const productController = express.Router();

productController.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const addProduct = await products.add('products', { name, quantity });

  res.status(201).json(addProduct);
}));

productController.get('/', rescue(async (_, res) => {
  const findAllProducts = await products.findAll('products');

  res.status(200).json({ products: findAllProducts });
}));

productController.get('/:id', validateId, rescue(async (req, res) => {
  const { id } = req.params;
  const findProduct = await products.findById('products', id);

  res.status(200).json(findProduct);
}));

module.exports = productController;
