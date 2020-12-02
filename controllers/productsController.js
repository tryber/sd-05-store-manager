const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/productsService');

const products = Router();

products.get('/', rescue(async (_req, res) => {
  const allProducts = await service.getAll();

  res.status(200).json({ products: allProducts });
}));

products.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const product = await service.getById(id);

  res.status(200).json(product);
}));

products.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  res.status(201).json(newProduct);
}));

module.exports = products;
