const { Router } = require('express');
const rescue = require('express-rescue');

// const models = require('../models/salesModel');
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

module.exports = salesRouter;
