// Referência:
// https://github.com/tryber/sd-05-live-lectures/blob/models-and-db/middlewares/error.js

const { Router } = require('express');
const Boom = require('@hapi/boom');

const sales = Router();

const salesService = require('../services/salesService');

const collectionName = 'sales';

sales.post('/', async (req, res, next) => {
  try {
    const sale = req.body;
    const registeredSale = await salesService.register(collectionName, sale);
    res.status(200).json(registeredSale);
  } catch (error) {
    next(Boom.badData(error.message, error.code));
  }
});

sales.get('/', async (req, res) => {
  try {
    const allSales = await salesService.listAll(collectionName);
    res.status(200).json(allSales);
  } catch (error) {
    console.error(error);
  }
});

sales.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleById = await salesService.listById(collectionName, id);
    res.status(200).json(saleById);
  } catch (error) {
    next(Boom.notFound(error.message, error.code));
  }
});

sales.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleToBeUpdated = req.body;
    console.log(id);
    console.log(saleToBeUpdated);
    const updatedSale = await salesService.update(collectionName, id, saleToBeUpdated);
    res.status(200).json(updatedSale);
  } catch (error) {
    next(Boom.badData(error.message, error.code));
  }
});

sales.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedSale = await salesService.remove(collectionName, id);
    res.status(200).json(removedSale);
  } catch (error) {
    next(Boom.badData(error.message, error.code));
  }
});

sales.use('/', (err, _req, res, _next) => {
  console.error(err);

  if (Boom.isBoom(err)) {
    return res
      .status(err.output.statusCode)
      .json({ err: { code: err.data, message: err.message } });
  }

  res.status(500).json({ message: err.message });
});

module.exports = sales;
