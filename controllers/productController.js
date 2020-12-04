const express = require('express');
const rescue = require('express-rescue');
const { Router } = require('express');
const productsValidate = require('../middlewares/productsValidate');

const router = Router();

const prodValidate = require('../middlewares/productsValidate');

const productsModel = require('../models/productsModel');

// Controler chamando diretamente a model sem intermédio do services

// 1 - Crie um endpoint para cadastro de produtos

router.post(
  '/',
  productsValidate.validaName,
  prodValidate.validaQtd,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productsModel.addProduct(name, quantity);
    res.status(201).json(product);
  }),
);

// 2 - Listar todos produtos e por id
router.get(
  '/',
  rescue(async (_req, res) => {
    const products = await productsModel.findAll();
    res.status(200).json({ products });
  }),
);

router.get(
  '/:id',
  productsValidate.validaId, rescue(async (req, res) => {
    const { product } = req.product;

    res.status(200).json(product);
  }),
);

// 3 - Atualizar produtos pelo id
router.put(
  '/:id',
  productsValidate.validaId,
  productsValidate.validaName,
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
  productsValidate.validaId,
  rescue(async (req, res) => {
    const { id } = req.params;

    await productsModel.deleteProduct(id);

    const deleteProduct = req.product;

    res.status(200).json(deleteProduct);
  }),
);

module.exports = router;
