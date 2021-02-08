// recebe as requisições do client e consulta o service
// "garçom" do restaurante

const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/productService');
const productModels = require('../models/productModel');

const prodRoute = Router();

prodRoute.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    // const { id } = req.params;

    const response = await services.create(name, quantity);

    if (response.err && response.err.code === 'invalid_data') {
      return res.status(422).json(response);
    }
    return res.status(201).json(response);
  }),
);

prodRoute.get(
  '/',
  rescue(async (_req, res) => {
    const products = await productModels.showAll();
    return res.status(200).json({ products });
  }),
);

prodRoute.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const response = await services.showById(id);
    if (response.err && response.er.code === 'invalid_data') {
      console.log(response.err);
      return res.status(422).json(response);
    }
    return res.status(200).json(response);
  }),
);

prodRoute.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const response = await services.update(id, name, quantity);
    if (response.err && response.err.code === 'invalid_data') {
      return res.status(422).json(response);
    }
    return res.status(200).json(response);
  }),
);

prodRoute.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const response = await services.del(id);
    if (response.err && response.err.code === 'invalid_data') {
      return res.status(422).json(response);
    }
    return res.status(200).json(delProd);
  }),
);

module.exports = prodRoute;
