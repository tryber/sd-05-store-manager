const { Router } = require('express');
const salesService = require('../service/salesService');
// const productsService = require('../service/productsService');

const routerSales = Router();

routerSales.post('/', async (req, res) => {
  const itensSold = req.body;
  try {
    // await productsService.updateSales(itensSold); // conferindo se o ID existe.
    const newSales = await salesService.createSales(itensSold);
    res.status(200).json(newSales);
  } catch (err) {
    console.error(err.message);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routerSales.get('/', async (_req, res) => {
  try {
    const sales = await salesService.AllSales();
    res.status(200).json({ sales });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routerSales.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.findIdSale(id);
    res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = routerSales;
