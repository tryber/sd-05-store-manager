const { Router } = require('express');
const rescue = require('express-rescue');

const models = require('../models/productsModel');
const services = require('../services/productsService');

const productsRouter = Router();

productsRouter.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const response = await services.create(name, quantity);

  if (response.err && response.err.code === 'invalid_data') {
    return res.status(422).json(response);
  }

  return res.status(201).json(response);
}));

productsRouter.get('/', rescue(async (_req, res) => {
  const products = await models.getAll();

  return res.status(200).json({ products });
}));

productsRouter.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const response = await services.getById(id);
  if (response.err && response.err.code === 'invalid_data') {
    return res.status(422).json(response);
  }
  return res.status(200).json(response);
}));

productsRouter.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const response = await services.update(id, name, quantity);
  if (response.err && response.err.code === 'invalid_data') {
    return res.status(422).json(response);
  }
  return res.status(200).json(response);
}));

module.exports = productsRouter;
