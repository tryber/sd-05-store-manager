const { Router } = require('express');

const sale = Router();

const salesService = require('../services/salesService');

sale.post('/', async (req, res) => {
  const vendas = req.body;
  try {
    const vendaEfetivada = await salesService.create(vendas);
    if (!vendaEfetivada) {
      return res.status(400).json({ message: 'Venda não efetivada' });
    }
    return res.status(200).json(vendaEfetivada);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

sale.get('/', async (_req, res) => {
  const getAll = await salesService.getAll();
  return res.status(200).json({ sales: getAll });
});

sale.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await salesService.saleById(id);
    return res.status(200).json(saleById);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = sale;
