/* const { Router } = require('express');

const service = require('../Service/salesService');

const sales = Router();

sales.get('/', async (_req, res) => {
  const sale = await service.getAll();

  res.status(200).json(sale);
});

sales.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await service.getById(id);

    res.status(200).json(sale);
  } catch (error) {
    if (error.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

sales.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const newSale = await service.create(productId, quantity);

    res.status(201).json(newSale);
  } catch (error) {
    if (error.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

sales.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    const updateSale = await service.update({ id, productId, quantity });
    res.status(200).json(updateSale);
  } catch (error) {
    if (error.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

sales.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removeSale = await service.remove(id);
    res.status(200).json(removeSale);
  } catch (error) {
    if (error.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = sales;
 */
