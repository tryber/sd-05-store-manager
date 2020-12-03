const { Router } = require('express');

const saleService = require('../services/salesService');

const saleRouter = Router();

saleRouter.post('/', async (req, res) => {
  const items = req.body;

  try {
    const itemsAdded = await saleService.create(items);

    res.status(200).json(itemsAdded);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.get('/', async (req, res) => {
  try {
    const allSales = await saleService.getAll();
    res.status(200).json({ sales: allSales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const saleById = await saleService.getById(id);
    res.status(200).json(saleById);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err });
    }

    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  try {
    await saleService.updateSale(sales, id);
    res.status(200).json({ _id: id, itensSold: sales });
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSale = await saleService.remove(id);

    return res.status(200).json(deletedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = saleRouter;
