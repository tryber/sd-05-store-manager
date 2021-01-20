const { Router } = require('express');
const { ObjectId } = require('mongodb');
const { salesService } = require('../services');

const salesRoute = Router();

salesRoute.get('/', async (_req, res) => {
  const err = { code: 'not_found', message: 'Sale not found' };
  const result = await salesService.getAllSales();
  return result.sale !== null ? res.status(200).json(result) : res.status(404).json({ err });
});

salesRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const err = { code: 'not_found', message: 'Sale not found' };
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ err });
  }
  const result = await salesService.getSaleById(id);
  if (!result) return res.status(404).json({ err });
  return res.status(200).json(result);
});

salesRoute.post('/', async (req, res) => {
  const sale = req.body;
  // console.log(sale);
  try {
    const err = { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
    const itensSold = await salesService.create(sale);
    if (!itensSold) return res.status(404).json({ err });
    return res.status(200).json(itensSold);
  } catch (err) {
    return res.status(422).json({ err });
  }
});

salesRoute.put('/:id', async (req, res) => {
  try {
    const err = { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    const saleId = req.params.id;
    // req.body is [{ productId, quantity }, ...]
    const saleData = req.body;
    const { productId } = saleData[0];
    const sale = await salesService.editSale(saleId, saleData);
    // if (!sale) {
    //   err.code = 'stock_problem';
    //   err.message = 'Such amount is not permitted to sell';
    //   return res.status(404).json({ err });
    // }
    if (!ObjectId.isValid(productId)) {
      return res.status(422).json({ err });
    }
    return res.status(200).json(sale);
  } catch (err) {
    return res.status(422).json({ err });
  }
});

salesRoute.delete('/:id', async (req, res) => {
  const saleId = req.params.id;
  const err = { code: 'invalid_data', message: 'Wrong sale ID format' };
  if (!ObjectId.isValid(saleId)) {
    return res.status(422).json({ err });
  }
  const deleted = await salesService.deleteSale(saleId);
  if (deleted !== null) {
    return res.status(200).json(deleted);
  }
  err.code = 'not_found';
  err.message = 'Sale not found';
  console.log('deletead');
  return res.status(404).json({ err });
});

module.exports = salesRoute;
