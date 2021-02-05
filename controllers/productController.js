// recebe as requisições do client e consulta o service
// "garçom" do restaurante

const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/productService');

const products = Router();

products.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const newProduct = await services.create(name, quantity);

    if (newProduct.err && newProduct.err.code === 'invalid_data') {
      return res.status(422).json(newProduct);
    }
    return res.status(201).json({ id, name, quantity });
  }),
);

module.exports = products;
