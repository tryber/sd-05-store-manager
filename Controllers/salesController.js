const { Router } = require('express');

const service = require('../Service/salesService');

const saless = Router();

saless.get('/', async (_req, res) => {
  const sales = await service.getAll();

  res.status(200).json({ sales });
});

saless.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await service.getById(id);

    res.status(200).json(sale);
  } catch (error) {
    if (error.err.code === 'not_found') {
      return res.status(404).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

saless.post('/', async (req, res) => {
  try {
    const { body } = req;
    // console.log(productId)
    const newSale = await service.create(body);
    res.status(200).json(newSale);
  } catch (error) {
    console.log(error.message);

    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saless.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateSale = await service.update(id, body);
    res.status(200).json(updateSale);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saless.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removeSale = await service.remove(id);
    res.status(200).json(removeSale);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = saless;
