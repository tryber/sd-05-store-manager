const { Router } = require('express');
const rescue = require('express-rescue');

const peopleServices = require('../services/productsService');

const products = Router();

products.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await peopleServices.create(name, quantity);
  res.status(201).json(newProduct);
}));

module.exports = products;
