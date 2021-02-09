const express = require('express');
const rescue = require('express-rescue');
const { validation } = require('../middlewares/validateSales');
const { createSaleValidation } = require('../service/salesService');

const salesController = express.Router();

salesController.post('/', validation, rescue(async (request, response) => {
  const sales = request.body;

  const result = await createSaleValidation(sales);
  if (result.err) return response.status(422).json(result);

  response.status(200).json(result);
}));

module.exports = {
  salesController,
};
