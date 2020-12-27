const express = require('express');
const { verifySale, verifySaleId, verifyDeletedId } = require('../middlewares/index');
const { modelSales } = require('../models/index');

const salesController = express.Router();

// criar endpoint para cadastrar vendas;
salesController.post('/', verifySale, async (req, res) => {
  const itemsSold = req.body;

  try {
    const newSales = await createSales(itemsSold);

    return res.status(200).json({ newSales });
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// criar endpoint para listar as vendas
salesController.get('/', async (_req, res) => {
  try {
    const allSales = await getAllSales();

    return res.status(200).json({ sales: allSales });
  } catch {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

salesController.get('/:id', verifySaleId, async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await findBySaleId(id);

    return res.status(200).json(sale);
  } catch (err) {
    return res.status(500).json({ message: 'Oops, something went wrong.' });
  }
});

// criar endpoint para atualizar uma venda
salesController.put('/:id', verifySale, async (req, res) => {
  const { id } = req.params;
  const itemsUpdated = ({ itemsSold } = req.body);

  try {
    const updatedSale = await updateSaleById(id, { itemsUpdated });
    return res.status(200).json(updatedSale);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// criar endpoint para deletar uma venda
salesController.delete('/:id', verifyDeletedId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await excludeSaleById(id);

    res.status(200).json(deletedSale);
  } catch (err) {
    return res.status(404).json({ err: { code: err.code, message: err.message } });
  }
  return res.status(500).json({ message: 'Oops! Something went wrong.' });
});

module.exports = salesController;
