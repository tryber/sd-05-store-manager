const { Router } = require('express');
// const { ObjectId } = require('mongodb');
const rescue = require('express-rescue');
const sales = require('../models/sales');

const salesRouter = Router();
const checkSale = require('../middleware/middleware_sales');

salesRouter.post('/', checkSale, rescue(async (req, res) => {
  const arraySales = req.body;
  // model para conversar com o db
  const sale = await sales.salesCreate(arraySales);

  return res.status(200).json(sale);
}));

module.exports = salesRouter;
