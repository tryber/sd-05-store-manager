const { Router } = require('express');
const rescue = require('express-rescue');

// const models = require('../models/salesModel');
const services = require('../services/salesService');

const salesRouter = Router();

salesRouter.post('/', rescue(async (req, res) => {
  const { productId, quantity } = req.body;

  const response = await services.create(productId, quantity);

  if (response.err && response.err.code === 'invalid_data') {
    return res.status(422).json(response);
  }

  return res.status(200).json(response);
}));
