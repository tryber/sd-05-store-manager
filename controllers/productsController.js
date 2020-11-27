const { Router } = require('express');
const rescue = require('express-rescue');

const peopleServices = require('../services/productsService');

const products = Router();

products.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await peopleServices.update(id, name, quantity);
  res.status(200).json({ _id: id, name, quantity });
}));

products.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await peopleServices.create(name, quantity);
  res.status(201).json(newProduct);
}));

products.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const unicProduct = await peopleServices.getById(id);
  res.status(200).json(unicProduct);
}));

products.get('/', rescue(async (req, res) => {
  const allProducts = await peopleServices.getAll();
  res.status(200).json({ products: allProducts });
}));

module.exports = products;
