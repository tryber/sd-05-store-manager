// recebe as requisições do client e consulta o service
// "garçom" do restaurante

const { Router } = require('express');
const rescue = require('express-rescue');

const productModel = require('../models/productModel');
const services = require('../services/productService');

const productRoute = Router();

productRoute.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const response = await services.create(name, quantity);

    if (response.err && response.err.code === 'invalid_data') {
      return res.status(422).json(response);
    }

    return res.status(201).json(response);
  }),
);

productRoute.get(
  '/',
  rescue(async (_req, res) => {
    const products = await productModel.showAll();

    return res.status(200).json({ products });
  }),
);

productRoute.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const response = await services.showById(id);
    if (response.err && response.err.code === 'invalid_data') {
      return res.status(422).json(response);
    }
    return res.status(200).json(response);
  }),
);

productRoute.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const response = await services.atualizar(id, name, quantity);

    if (response.err && response.err.code === 'invalid_data') {
      return res.status(422).json(response);
    }

    return res.status(200).json(response);
  }),
);

productRoute.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const response = await services.excluir(id);

    if (response.err && response.err.code === 'invalid_data') {
      return res.status(422).json(response);
    }

    return res.status(200).json(response);
  }),
);

module.exports = productRoute;
