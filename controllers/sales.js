const { Router } = require('express');

const services = require('../services/sales');

const salesRouter = Router();

salesRouter.get('/', async (req, res) => {
  const sales = await services.getAll();
  res.status(200).json({ sales });
});

salesRouter.post('/', async (req, res) => {
  try {
    const { body } = req;
    const novo = await services.create(body);
    res.status(200).json(novo);
  } catch (error) {
    console.log('erro controller', error);
    if (error.err.code === 'invalid_data') return res.status(422).json(error);
    console.error(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

salesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('id no controller => ', id);
    const sale = await services.getSale(id);
    res.status(200).json(sale);
  } catch (error) {
    if (error.err.code === 'not_found') {
      return res.status(404).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

salesRouter.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const updated = await services.update(id, body);
    res.status(200).json(updated);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

salesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await services.remove(id);
    res.status(200).json(deleted);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = salesRouter;
