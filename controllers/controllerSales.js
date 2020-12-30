const express = require('express');
const { verifySales, verifySalesId, verifyDeletedId } = require('../middlewares');
const {
  salesModel: { createSales,
  getAllSales,
  findBySalesId,
  updateSalesById,
  deleteSalesById }
} = require('../models');

const salesController = express.Router();

// Rquisito 5: criar endpoint para cadastrar vendas;
salesController.post('/', verifySales, async (req, res) => {
  
  try {
    const itemsSold = req.body;
    const newSales = await createSales(itemsSold);

    return res.status(200).json( newSales );
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// Rquisito 6: criar endpoint para listar as vendas
salesController.get('/', async (_req, res) => {
  try {
    const allSales = await getAllSales();

    return res.status(200).json({ sales: allSales });
  } catch {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

salesController.get('/:id', verifySalesId, async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await findBySalesId(id);

    return res.status(200).json(sale);
  } catch (err) {
    return res.status(500).json({ message: 'Oops, something went wrong.' });
  }
});

// Requisito 7: criar endpoint para atualizar uma venda
salesController.put('/:id', verifySales, async (req, res) => {
  const { id } = req.params;
  const itemsUpdated = { itensSold: req.body };

  try {
    const updatedSale = await updateSalesById(id, itemsUpdated );
    return res.status(200).json(updatedSale);
  } catch (err) {
    return res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// Requisito 8: criar endpoint para deletar uma venda
salesController.delete('/:id', verifyDeletedId, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSales = await deleteSalesById(id);

    res.status(200).json(deletedSales);
  } catch (err) {
    return res.status(404).json({ err: { code: err.code, message: err.message } });
  }
  return res.status(500).json({ message: 'Oops! Something went wrong.' });
});

module.exports = salesController;
