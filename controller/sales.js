const express = require('express');
const validate = require('../middleware/validate');
const crud = require('../model');
const quantityService = require('../service/quantity');

const router = express.Router();

router.post(
  '/',
  validate.salesQuantityIsNumber,
  validate.salesQuantityIsNot0OrLess,
  validate.quantityIsNot0OrLess,
  async (request, response) => {
    const [...itensSold] = request.body;
    const sales = await crud.create('sales', { itensSold });
    await quantityService.updateProductQuantity(request.method, itensSold);
    response.status(200).json(sales);
  },
);

router.get('/', async (_, response) => {
  crud.read('all', null, 'sales').then((sales) => response.status(200).json({ sales }));
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const sale = await crud.read('id', id, 'sales');
  if (!sale) {
    return response.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  response.status(200).json(sale);
});

router.put(
  '/:id',
  validate.salesProductIdAndQuantity,
  validate.salesQuantityIsNumber,
  validate.salesQuantityIsNot0OrLess,
  validate.quantityIsNot0OrLess,
  async (request, response) => {
    const { id } = request.params;
    const document = {
      itensSold: request.body,
    };
    await crud.update('sales', id, document);
    crud.read('id', id, 'sales').then((sale) => response.status(200).json(sale));
  },
);

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const sale = await crud.read('id', id, 'sales');
  if (!sale) {
    return response.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  await quantityService.updateProductQuantity(request.method, sale.itensSold);
  await crud.delete('sales', id);
  response.status(200).json(request.sale);
});

module.exports = router;
