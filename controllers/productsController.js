// const boom = require('@hapi/boom');
const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../services/productsService');

const products = Router();

products.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const newProduct = await service.create(name, quantity);

  if (newProduct.err && newProduct.err.code === 'invalid_data') {
    throw res.status(422).json(newProduct.err.message);
  }

  return res.status(201).json({ id, name, quantity });
}));

module.exports = products;
