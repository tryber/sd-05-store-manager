// const boom = require('boom');
// const rescue = require('express-rescue');
const service = require('../services/productService');
// const model = require('../models/productsModel');

const getAll = async (req, res) => { // rescue(
  try {
    const products = await service.getAll();

    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Algo deu ruim no getAll' });
  }
}; // )

const getById = async (req, res) => { // rescue(
  const { id } = req.params;
  try {
    const product = await service.getById(id);

    res.status(200).json(product);
  } catch (err) {
    // console.log(err);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    // console.error(err);
    res.status(500).json({ message: 'Algo deu errado getId' });
  }
}; // )

const create = async (req, res) => { // rescue(
  const { name, quantity } = req.body;
  try {
    const createdProduct = await service.create(name, quantity);
    // console.log(createdProduct);
    res.status(201).json(createdProduct);
  } catch (err) {
    // console.log(err);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no create' });
  }
}; // )

const update = async (req, res) => { // rescue(
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProduct = await service.update(id, name, quantity);
    res.status(200).json(updatedProduct); // não seria 204?
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    // console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado no update' });
  }
}; // )

const remove = async (req, res) => { // rescue(
  const { id } = req.params;
  try {
    await service.exclude(id);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    // console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado no REMOVE' });
  }
}; // )

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
