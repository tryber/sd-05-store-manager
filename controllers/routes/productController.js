const { Router } = require('express');
const { productServices } = require('../../services');

const route = Router();

route.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productServices.insertProduct(name, quantity);

  if (product.err) return res.status(422).json(product);
  return res.status(201).json(product);
});

route.get('/', async (req, res) => {
  const answer = await productServices.getAll();
  return res.status(200).json({ products: answer });
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await productServices.getById(id);

  if (answer.err) {
    return res.status(422).json(answer);
  }

  return res.status(200).json(answer);
});

route.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const answer = await productServices.updateOneProduct(id, name, quantity);

  if (answer.err) {
    return res.status(422).json(answer);
  }

  return res.status(200).json(answer);
});

route.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await productServices.deleteOneProduct(id);

  if (answer.err) {
    return res.status(422).json(answer);
  }

  return res.status(200).json(answer);
});

module.exports = route;
