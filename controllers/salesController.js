const { Router } = require('express');
const { ObjectId } = require('mongodb');

const salesService = require('../services/salesService');

const route = Router();

route.post('/', async (req, res) => {
  try {
    const itensSold = await salesService.create(req.body);
    return res.status(200).json(itensSold);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

route.get('/', async (_req, res) => {
  const getAll = await salesService.getAll();
  return res.status(200).json({ sales: getAll });
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await salesService.getById(id);
    return res.status(200).json(getById);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = await salesService.update(id, req.body);
    res.status(200).json(updateProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

route.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await salesService.remove(id);
    return res.status(200).json(deleted);
  } catch (err) {
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = route;
