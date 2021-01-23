const { Router } = require('express');
const rescue = require('express-rescue');
const sales = require('../models/sales');

const salesRouter = Router();
const checkSale = require('../middleware/middleware_sales');
const { ObjectID } = require('mongodb');

salesRouter.post('/', checkSale, rescue(async (req, res) => {
  const arraySales = req.body;
  // model para conversar com o db
  const sale = await sales.salesCreate(arraySales);

  return res.status(200).json(sale);
}));

salesRouter.get('/:id', async (req, res) => {
  
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  
  const saleById = await sales.getSaleById(req.params.id);
  
  if (!saleById) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  return res.status(200).json(saleById);
})

salesRouter.get('/', async (req, res) => {
  const listSales = await sales.listSales()

  return res.status(200).json(listSales);
})

module.exports = salesRouter;
