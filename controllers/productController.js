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
    try {
      const { name, quantity } = req.body;

      const response = await services.create(name, quantity);

      if (response.err && response.err.code === 'invalid_data') {
        return res.status(422).json(response);
      }

      return res.status(201).json(response);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }),
);

productRoute.get(
  '/',
  rescue(async (_req, res) => {
    try {
      const products = await productModel.showAll();

      return res.status(200).json({ products });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }),
);

productRoute.get(
  '/:id',
  rescue(async (req, res) => {
    try {
      const { id } = req.params;

      const response = await services.showById(id);
      if (response.err && response.err.code === 'invalid_data') {
        return res.status(422).json(response);
      }
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }),
);

productRoute.put(
  '/:id',
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;

      const response = await services.atualizar(id, name, quantity);

      if (response.err && response.err.code === 'invalid_data') {
        return res.status(422).json(response);
      }

      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }),
);

productRoute.delete(
  '/:id',
  rescue(async (req, res) => {
    try {
      const { id } = req.params;

      const response = await services.excluir(id);

      if (response.err && response.err.code === 'invalid_data') {
        return res.status(422).json(response);
      }

      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }),
);

module.exports = productRoute;
