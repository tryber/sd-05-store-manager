// recebe as requisições do client e consulta o service
// "garçom" do restaurante

const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/productService');
const productModels = require('../models/productModel');

const route = Router();

route.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    // const { id } = req.params;

    const newProduct = await services.create(name, quantity);

    if (newProduct.err && newProduct.err.code === 'invalid_data') {
      return res.status(422).json(newProduct);
    }
    return res.status(201).json(newProduct);
  }),
);

route.get(
  '/',
  rescue(async (req, res) => {
    const products = await productModels.showAll();
    return res.status(200).json({ products });
  }),
);

route.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const resId = await services.showById(id);
    if (resId.err && resId.er.code === 'invalid_data') {
      console.log(resId.err);
      return res.status(422).json(resId);
    }
    return res.status(200).json(resId);
  }),
);

module.exports = route;
