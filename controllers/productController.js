const express = require('express');
const rescue = require('express-rescue');
const products = require('../models/products');
const validateProduct = require('../middleware/productValidation');

const productController = express.Router();

productController.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const addProduct = await products.add('products', { name, quantity });
  res.status(201).json(addProduct);
}));

module.exports = productController;
