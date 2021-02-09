const { Router } = require('express');

const products = Router();

const {
  registerProduct,
} = require('../services/product.services');

products.post('/', registerProduct, (req, res) => {
  res.status(201).json(req.data);
});

module.exports = products;
