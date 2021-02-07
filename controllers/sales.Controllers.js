const { Router } = require('express');

const service = require('../services/salesService');

const router = Router();

router.get('/', async (_req, res) => {
  const sales = await service.getAll();

  res.status(200).json({ sales });
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await service.getById(id);

    res.status(200).json(sale);
  } catch (error) {
    if (error.err.code === 'not_found') {
      return res.status(404).json(error);
    }
    console.error(error);
    res.status(500).json({ message: error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const newSale = await service.create(body);
    res.status(200).json(newSale);
  } catch (error) {
    console.log(error.message);

    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: error });
  }
});

router.put('/:id', async (req, res) => {
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
    res.status(500).json({ message: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await service.exclude(id);
    res.status(200).json(remove);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    console.error(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
