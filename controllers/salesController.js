const express = require('express');
const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const salesService = require('../services/salesServices');
const productService = require('../services/productService');

const salesController = express.Router();
// realiza venda
salesController.post('/', async (req, res) => {
  const itensSold = req.body;

  try {
    // envia o array de items vendidos para um forEach que atualiza
    // a quantidade de produtos
    // REVIEW
    await productService.updateProductsDB(itensSold, 'venda');

    const itensSoldAdded = await salesService.addSale(itensSold);
    res.status(200).json(itensSoldAdded);
    // FIXME
  } catch (err) {
    console.log('entrou no catch do stock');
    if (err.code === 'invalid_data') {
      // console.log((err));
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    } // FIXME teria que entrar aqui.

    if (err.code === 'stock_problem') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }
  }
});

salesController.get('/', async (req, res) => {
  try {
    const sales = await salesModel.getAll();
    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});
// 6 - Requisito 6, assim como o 8, mesmo que funcionando adequadamente
// no postman, só passaram tirando a 'tercerização' dos services
salesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  // Tentativa 2 - Logica de validação diretamente no controller
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }

  const sales = await salesModel.findById(id);

  if (!sales) {
    res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }

  return res.status(200).json({ sales });
  // Tentativa 1 - Envia pro SERVICES, validação ocorre lá.

  // try {
  //   // console.log('entrou 1', id);
  //   const sales = await salesService.findById(id);
  //   return res.status(200).json({ sales });
  // } catch (err) {
  //   if (err.code === 'not_found') {
  //     return res.status(404).json({ err: { code: err.code, message: err.message } });
  //   }
  // }
});

salesController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  // console.log(productId, quantity);
  try {
    const updateSale = await salesService.update(id, productId, quantity);
    return res.status(200).json(updateSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
  }
});
// -----
salesController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }

  const itensSold = await salesModel.findById(id);
  if (!itensSold) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }

  productService.updateProductsDB(itensSold.itensSold, 'delete');
  const isSaleDeleted = await salesService.exclude(id);
  // console.log('before delete, itens sold');
  // console.log(itensSold.itensSold);
  return res.status(200).json(isSaleDeleted);
});
// -----
module.exports = salesController;
