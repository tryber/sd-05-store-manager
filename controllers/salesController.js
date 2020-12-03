const { Router } = require('express');

const sale = Router();

const sService = require('../services/salesService');

sale.post('/', async (req, res) => {
  const vendas = req.body;
  try {
    const vendaEfetivada = await sService.create(vendas);
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
  const getAll = await sService.getAll();
  return res.status(200).json({ sales: getAll });
});

sale.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await sService.saleById(id);
    return res.status(200).json(saleById);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

sale.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = await sService.update(id, req.body);
    res.status(200).json(update);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

sale.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletado = await sService.deleteProd(id);
    return res.status(200).json(deletado);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = sale;
