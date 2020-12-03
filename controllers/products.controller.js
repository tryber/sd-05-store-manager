const { Router } = require('express');

const products = Router();

const {
  registerProduct,
  listProduct,
  updateProduct,
  deleteProduct,
} = require('../services/product.service');

products.get('/', listProduct, (req, res) => {
  res.status(200).json(req.data);
});

products.get('/:id', listProduct, (req, res) => {
  res.status(200).json(req.data);
});

products.post('/', registerProduct, (req, res) => {
  res.status(201).json(req.data);
});

products.put('/:id', updateProduct, (req, res) => {
  res.status(200).json(req.data);
});

products.delete('/:id', deleteProduct, (req, res) => {
  res.status(200).json(req.data);
});

module.exports = products;
