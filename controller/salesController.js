const { Router } = require('express');
const { ObjectID } = require('mongodb');
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
});

salesRouter.get('/', async (_req, res) => {
  const listSales = await sales.listSales();

  return res.status(200).json(listSales);
});

salesRouter.put('/:id', checkSale, async (req, res) => {
  // const listSales = await sales.listSales();
  const saleById = await sales.getSaleById(req.params.id);
  if (!saleById) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  const changedSale = { ...saleById, itensSold: req.body };
  await sales.editSale(req.params.id, changedSale.itensSold);
  res.status(200).json(changedSale);
});

salesRouter.delete('/:id', async (req, res) => {
  try {
    const saleById = await sales.getSaleById(req.params.id);
    if (!saleById) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      });
    }

    await sales.deleteSale(req.params.id);
    res.status(200).json();
  } catch (error) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
});

module.exports = salesRouter;
