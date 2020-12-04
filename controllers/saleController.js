const express = require('express');
const rescue = require('express-rescue');
const salesModel = require('../models/salesModel');

const router = express.Router();

const saleValidaQtd = require('../middlewares/salesValidate');
const salesValidate = require('../middlewares/salesValidate');

// Controler chamando diretamente a model sem intermédio do services

// 1 - Crie um endpoint para cadastrar venda

router.post(
  '/',
  salesValidate.saleValidaQtd,
  rescue(async (req, res) => {
    const sale = req.body;
    const newsale = await salesModel.createSale(sale);
    res.status(201).json(newsale);
  }),
);

// 2 - Listar todas as vendas
router.get(
  '/',
  rescue(async (_req, res) => {
    const sales = await salesModel.findAllSale();
    res.status(200).json({ sales });
  }),
);

router.get(
  '/:id',
  salesValidate.validaId, rescue(async (req, res) => {
    const { product } = req.product;

    res.status(200).json(product);
  }),
);

// 3 - Atualizar produtos pelo id
router.put(
  '/:id',
  salesValidate.validaId,
  salesValidate.validaName,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    await productsModel.productUpdate(id, name, quantity);

    const productUpdate = await productsModel.findById(id);

    res.status(200).json(productUpdate);
  }),
);

// 4 - Deletar um produto por id

router.delete(
  '/:id',
  salesValidate.validaId,
  rescue(async (req, res) => {
    const { id } = req.params;

    await productsModel.deleteProduct(id);

    const deleteProduct = req.product;

    res.status(200).json(deleteProduct);
  }),
);

module.exports = router;
