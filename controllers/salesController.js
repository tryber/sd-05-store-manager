const { Router } = require('express');
const rescue = require('express-rescue');

const models = require('../models/salesModel');
const services = require('../services/salesService');

const salesRouter = Router();

salesRouter.post('/', rescue(async (req, res) => {
  const saleList = req.body;

  try {
    const response = await services.create(saleList);
    return res.status(200).json(response);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
  }
}));

salesRouter.get('/', rescue(async (_req, res) => {
  const sales = await models.getAll();

  return res.status(200).json({ sales });
}));

salesRouter.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  try {
    const response = await services.getById(id);
    return res.status(200).json(response);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }
  }
}));

salesRouter.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  try {
    const response = await services.update(id, productId, quantity);
    return res.status(200).json(response);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
  }
}));

module.exports = salesRouter;
