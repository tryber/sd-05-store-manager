const express = require('express');
const validate = require('../middleware/validate');
const crud = require('../model');

const router = express.Router();

router.post(
  '/',
  validate.nameLongerThan5,
  validate.quantityIsNumber,
  validate.quantityIsNot0OrLess,
  async (request, response) => {
    const { name, quantity } = request.body;
    try {
      const alreadyInDBProduct = await crud.read('name', 'products', name);

      if (alreadyInDBProduct) {
        return response
          .status(422)
          .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
      }

      const insertedProduct = await crud.create('products', { name, quantity });
      return response.status(201).json(insertedProduct);
    } catch (err) {
      return response.status(500).json({ err });
    }
  },
);

router.get('/', async (_, response) => {
  const products = await crud.read('all', 'products');
  return response.status(200).json({ products });
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  const product = await crud.read('id', 'products', id);

  if (!product) {
    return response.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }

  return response.status(200).json(product);
});

router.put(
  '/:id',
  validate.nameLongerThan5,
  validate.quantityIsNumber,
  validate.quantityIsNot0OrLess,
  async (request, response) => {
    const { name, quantity } = request.body;
    const { id } = request.params;
    try {
      const product = await crud.read('id', 'products', id);

      if (!product) {
        return response.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
      }
      await crud.update('products', id, { name, quantity });

      const updatedProduct = await crud.read('id', 'products', id);

      return response.status(200).json(updatedProduct);
    } catch (err) {
      return response.status(500).json({ err });
    }
  },
);

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const product = await crud.read('id', 'products', id);

  if (!product) {
    return response.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }

  await crud.delete('products', id);
  return response.status(200).json(product);
});

module.exports = router;
