const { Router } = require('express');
const rescue = require('express-rescue');

const saleModel = require('../models/saleModel');
const services = require('../services/saleService');

const saleRoute = Router();

saleRoute.post(
  '/',
  rescue(async (req, res) => {
    const allSale = req.body;
    try {
      const response = await services.create(allSale);
      return res.status(200).json(response);
    } catch (err) {
      if (err.code === 'invalid_data') {
        return res.status(422).json({ err });
      }
      if (err.code === 'stock_problem') {
        return res.status(404).json({ err });
      }
    }
  }),
);

saleRoute.get(
  '/',
  rescue(async (_req, res) => {
    try {
      const sales = await saleModel.showAll();

      return res.status(200).json({ sales });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }),
);

saleRoute.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    try {
      const response = await services.showById(id);
      return res.status(200).json(response);
    } catch (err) {
      if (err.code === 'not_found') {
        return res.status(404).json({ err });
      }
      res.status(500).json(err.message);
    }
  }),
);

saleRoute.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];

    try {
      const response = await services.atualizar(id, productId, quantity);
      return res.status(200).json(response);
    } catch (err) {
      if (err.code === 'not_found') {
        return res.status(404).json({ err });
      }
      if (err.code === 'invalid_data') {
        return res.status(422).json({ err });
      }
      res.status(500).json(err.message);
    }
  }),
);

saleRoute.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    try {
      const response = await services.excluir(id);
      return res.status(200).json(response);
    } catch (err) {
      if (err.code === 'invalid_data') {
        return res.status(422).json({ err });
      }
      res.status(500).json(err.message);
    }
  }),
);

module.exports = saleRoute;
