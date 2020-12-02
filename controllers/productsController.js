const { Router } = require('express');

const product = Router();

const pService = require('../services/productsService');

product.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const produtoAdicionado = await pService.create(name, quantity);
    if (!produtoAdicionado) {
      return res.status(400).json({ message: 'O produto não foi adicionado' });
    }
    return res.status(201).json(produtoAdicionado);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

product.get('/', async (_req, res) => {
  const getAll = await pService.getAll();
  return res.status(200).json(getAll);
});

product.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prodById = await pService.prodById(id);
    res.status(200).json(prodById);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = product;
