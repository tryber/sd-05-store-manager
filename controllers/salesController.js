const { Router } = require('express');

const saleService = require('../services/salesService');

const saleRouter = Router();

// const throwError = (err, res) => {
//   if (err.code === 'invalid_data') res.status(422).json({ err });
//   res.status(500).json({ message: 'Algo deu errado' });
// };

saleRouter.post('/', async (req, res) => {
  const itens = req.body;

  try {
    const newSale = await saleService.create(itens);
    // console.log(newSale);
    res.status(200).json(newSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.get('/', async (req, res) => {
  try {
    const sales = await saleService.getAll();

    res.status(200).json({ sales });
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await saleService.getById(id);

    return res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const sale = await saleService.updateById(+id, quantity);

    res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    res.status(500).json({ message: 'Algo deu errado' });
  }
});

saleRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedsale = await saleService.remove(+id);

    res.status(200).json(deletedsale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = saleRouter;
