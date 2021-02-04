const { Router } = require('express');
const servicesSales = require('../services/sales');

const salesRouter = Router();

salesRouter.post('/', async (req, res) => {
  try {
    const newSale = await servicesSales.insertNewSale(req.body);
    return res.status(200).json(newSale);
  } catch (err) {
    return res.status(err.status).json({ err });
  }
});

module.exports = salesRouter;
