const { Router } = require('express');
const { salesServices } = require('../../services');

const route = Router();

route.post('/', async (req, res) => {
  const answer = await salesServices.registerSale(req.body);

  if (answer.err) return res.status(422).json(answer);

  return res.status(200).json(answer);
});

route.get('/', async (req, res) => {
  const answer = await salesServices.getAllSService();
  return res.status(200).json({ sales: answer });
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await salesServices.getSaleById(id);

  if (answer.err) {
    return res.status(404).json(answer);
  }

  return res.status(200).json(answer);
});

route.put('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await salesServices.updateSale(id, req.body);

  if (answer.err) {
    return res.status(422).json(answer);
  }

  return res.status(200).json(answer);
});

module.exports = route;
