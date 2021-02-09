const { Router } = require('express');

const salesRouter = Router();

const salesService = require('../services/salesService');

const salesModel = require('../models/salesModel');
const checkStock = require('../middlewares/checkStock');

// 5 - Crie um endpoint para cadastrar vendas
salesRouter.post('/', checkStock, async (req, res) => {
  const salesList = req.body; // dessa vez, é um array de objetos
  try {
    const saleCreated = await salesService.create(salesList);
    if (!saleCreated) return res.status(400).json({ message: 'Venda não foi criada' });
    return res.status(200).json(saleCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

// 6 - Crie um endpoint para listar as vendas
salesRouter.get('/', async (req, res) => {
  try {
    const sales = await salesModel.getAll();
    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const saleById = await salesService.getById(id);
    res.status(200).json(saleById);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

// 7 - Crie um endpoint para atualizar uma venda
salesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const salesList = req.body[0];
  const { productId, quantity } = salesList;
  // console.log(productId, quantity);
  try {
    const updatedSale = await salesService.updateById(id, productId, quantity);
    res.status(200).json(updatedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

// 8 - Crie um endpoint para deletar uma venda
salesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSale = await salesService.deleteById(id);
    return res.status(200).json(deletedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno aiaiai' });
  }
});

module.exports = salesRouter;
